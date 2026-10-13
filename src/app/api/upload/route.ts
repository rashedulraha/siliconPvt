import { NextResponse } from "next/server";
import { verifyAdminSession, unauthorizedResponse } from "@/lib/server-auth";

export async function POST(req: Request) {
	try {
		const session = await verifyAdminSession(req);
		if (!session) {
			return unauthorizedResponse();
		}

		// Resolve API Key
		const headerKey = req.headers.get("x-imgbb-key");
		const apiKey =
			process.env.IMGBB_API_KEY ||
			process.env.NEXT_PUBLIC_IMGBB_API_KEY ||
			headerKey;

		if (!apiKey) {
			return NextResponse.json(
				{
					success: false,
					error:
						"ImgBB API Key is not configured. Please add IMGBB_API_KEY to your .env file or provide it in the header.",
				},
				{ status: 400 },
			);
		}

		let base64Image = "";
		let fileName = "upload.jpg";

		const contentType = req.headers.get("content-type") || "";

		if (contentType.includes("multipart/form-data")) {
			const formData = await req.formData();
			const file = formData.get("file") as File | null;
			const imageField = formData.get("image") as string | null;

			if (file) {
				const arrayBuffer = await file.arrayBuffer();
				const buffer = Buffer.from(arrayBuffer);
				base64Image = buffer.toString("base64");
				fileName = file.name || fileName;
			} else if (imageField) {
				base64Image = imageField.replace(/^data:image\/[a-z]+;base64,/, "");
			}
		} else {
			// Handle JSON payload
			const body = await req.json();
			if (body.image) {
				base64Image = body.image.replace(/^data:image\/[a-z]+;base64,/, "");
				if (body.name) fileName = body.name;
			}
		}

		if (!base64Image) {
			return NextResponse.json(
				{
					success: false,
					error: "No image file or base64 data was received.",
				},
				{ status: 400 },
			);
		}

		// Send to ImgBB API
		const imgbbForm = new URLSearchParams();
		imgbbForm.append("image", base64Image);
		if (fileName) {
			imgbbForm.append("name", fileName.replace(/\.[^/.]+$/, ""));
		}

		const imgbbResponse = await fetch(
			`https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: imgbbForm.toString(),
			},
		);

		const result = await imgbbResponse.json();

		if (!imgbbResponse.ok || !result.success) {
			const errMsg =
				result?.error?.message ||
				`ImgBB upload failed with status ${imgbbResponse.status}`;
			console.error("[ImgBB API Error]:", result);
			return NextResponse.json(
				{
					success: false,
					error: errMsg,
					details: result,
				},
				{ status: 400 },
			);
		}

		// Direct permanent image URL from ImgBB
		const directUrl =
			result.data?.url || result.data?.display_url || result.data?.image?.url;

		return NextResponse.json({
			success: true,
			url: directUrl,
			displayUrl: result.data?.display_url || directUrl,
			thumbUrl: result.data?.thumb?.url,
			deleteUrl: result.data?.delete_url,
			title: result.data?.title,
			data: result.data,
		});
	} catch (error: any) {
		console.error("[API /api/upload Exception]:", error);
		return NextResponse.json(
			{
				success: false,
				error:
					error.message || "An unexpected error occurred during image upload",
			},
			{ status: 500 },
		);
	}
}
