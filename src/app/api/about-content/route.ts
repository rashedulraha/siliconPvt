import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
	errorResponse,
	verifyAdminSession,
	unauthorizedResponse,
} from "@/lib/server-auth";

export async function GET() {
	try {
		const content = await prisma.aboutContent.findFirst();
		return NextResponse.json({ success: true, content, data: content });
	} catch (error: any) {
		return errorResponse(error);
	}
}

export async function PUT(req: Request) {
	try {
		const session = await verifyAdminSession(req);
		if (!session) {
			return unauthorizedResponse();
		}

		const data = await req.json();
		let existing = await prisma.aboutContent.findFirst();

		let content;
		if (!existing) {
			content = await prisma.aboutContent.create({
				data: {
					...data,
				},
			});
		} else {
			content = await prisma.aboutContent.update({
				where: { id: existing.id },
				data: {
					...(data.heroTitle !== undefined && { heroTitle: data.heroTitle }),
					...(data.heroTitleBn !== undefined && {
						heroTitleBn: data.heroTitleBn,
					}),
					...(data.heroSubtitle !== undefined && {
						heroSubtitle: data.heroSubtitle,
					}),
					...(data.heroSubtitleBn !== undefined && {
						heroSubtitleBn: data.heroSubtitleBn,
					}),
					...(data.heroDesc !== undefined && { heroDesc: data.heroDesc }),
					...(data.heroDescBn !== undefined && { heroDescBn: data.heroDescBn }),
					...(data.whoWeAreTitle !== undefined && {
						whoWeAreTitle: data.whoWeAreTitle,
					}),
					...(data.whoWeAreTitleBn !== undefined && {
						whoWeAreTitleBn: data.whoWeAreTitleBn,
					}),
					...(data.whoWeAreDesc !== undefined && {
						whoWeAreDesc: data.whoWeAreDesc,
					}),
					...(data.whoWeAreDescBn !== undefined && {
						whoWeAreDescBn: data.whoWeAreDescBn,
					}),
					...(data.missionTitle !== undefined && {
						missionTitle: data.missionTitle,
					}),
					...(data.missionTitleBn !== undefined && {
						missionTitleBn: data.missionTitleBn,
					}),
					...(data.missionDesc !== undefined && {
						missionDesc: data.missionDesc,
					}),
					...(data.missionDescBn !== undefined && {
						missionDescBn: data.missionDescBn,
					}),
					...(data.visionTitle !== undefined && {
						visionTitle: data.visionTitle,
					}),
					...(data.visionTitleBn !== undefined && {
						visionTitleBn: data.visionTitleBn,
					}),
					...(data.visionDesc !== undefined && { visionDesc: data.visionDesc }),
					...(data.visionDescBn !== undefined && {
						visionDescBn: data.visionDescBn,
					}),
					...(data.chairmanName !== undefined && {
						chairmanName: data.chairmanName,
					}),
					...(data.chairmanNameBn !== undefined && {
						chairmanNameBn: data.chairmanNameBn,
					}),
					...(data.chairmanRole !== undefined && {
						chairmanRole: data.chairmanRole,
					}),
					...(data.chairmanRoleBn !== undefined && {
						chairmanRoleBn: data.chairmanRoleBn,
					}),
					...(data.chairmanSpeech !== undefined && {
						chairmanSpeech: data.chairmanSpeech,
					}),
					...(data.chairmanSpeechBn !== undefined && {
						chairmanSpeechBn: data.chairmanSpeechBn,
					}),
					...(data.chairmanImage !== undefined && {
						chairmanImage: data.chairmanImage,
					}),
					...(data.mdName !== undefined && { mdName: data.mdName }),
					...(data.mdNameBn !== undefined && { mdNameBn: data.mdNameBn }),
					...(data.mdRole !== undefined && { mdRole: data.mdRole }),
					...(data.mdRoleBn !== undefined && { mdRoleBn: data.mdRoleBn }),
					...(data.mdSpeech !== undefined && { mdSpeech: data.mdSpeech }),
					...(data.mdSpeechBn !== undefined && { mdSpeechBn: data.mdSpeechBn }),
					...(data.mdImage !== undefined && { mdImage: data.mdImage }),
					...(data.stats !== undefined && { stats: data.stats }),
					...(data.statsBn !== undefined && { statsBn: data.statsBn }),
					...(data.coreValues !== undefined && { coreValues: data.coreValues }),
					...(data.coreValuesBn !== undefined && {
						coreValuesBn: data.coreValuesBn,
					}),
					...(data.timeline !== undefined && { timeline: data.timeline }),
					...(data.timelineBn !== undefined && { timelineBn: data.timelineBn }),
					...(data.whyChooseUs !== undefined && {
						whyChooseUs: data.whyChooseUs,
					}),
					...(data.whyChooseUsBn !== undefined && {
						whyChooseUsBn: data.whyChooseUsBn,
					}),
					...(data.managementTeam !== undefined && {
						managementTeam: data.managementTeam,
					}),
					...(data.managementTeamBn !== undefined && {
						managementTeamBn: data.managementTeamBn,
					}),
				},
			});
		}

		return NextResponse.json({ success: true, content, data: content });
	} catch (error: any) {
		return errorResponse(error);
	}
}
