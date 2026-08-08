"use client";

import { useState, useEffect } from "react";
import { Save, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSEO } from "@/hooks/useSEO";
import type { SEOConfig, SEOData } from "@/types";

const pages: { key: keyof SEOConfig; label: string }[] = [
	{ key: "home", label: "Home" },
	{ key: "about", label: "About" },
	{ key: "properties", label: "Properties" },
	{ key: "blog", label: "Blog" },
	{ key: "contact", label: "Contact" },
	{ key: "careers", label: "Careers" },
];

export default function SEOPage() {
	const { seo, updatePageSEO } = useSEO();
	const [activePage, setActivePage] = useState<keyof SEOConfig>("home");
	const [form, setForm] = useState<SEOData>(seo.home);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		setForm(seo[activePage]);
	}, [activePage, seo]);

	const handleSave = () => {
		updatePageSEO(activePage, form);
		setSaved(true);
		setTimeout(() => setSaved(false), 2000);
	};

	const titleLength = form.title.length;
	const descLength = form.description.length;

	return (
		<div className="space-y-6 max-w-5xl">
			<Tabs
				value={activePage}
				onValueChange={(v) => setActivePage(v as keyof SEOConfig)}
			>
				<TabsList className="flex-wrap h-auto">
					{pages.map((p) => (
						<TabsTrigger key={p.key} value={p.key}>
							{p.label}
						</TabsTrigger>
					))}
				</TabsList>

				{pages.map((p) => (
					<TabsContent key={p.key} value={p.key} className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>SEO for {p.label} Page</CardTitle>
								<CardDescription>
									These meta tags appear in search engines and social media
									previews.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								{/* Title */}
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<Label htmlFor="seo-title">Page Title</Label>
										<span
											className={`text-xs ${
												titleLength > 60
													? "text-destructive"
													: "text-muted-foreground"
											}`}
										>
											{titleLength}/60
										</span>
									</div>
									<Input
										id="seo-title"
										value={form.title}
										onChange={(e) =>
											setForm({ ...form, title: e.target.value })
										}
										placeholder="Page title for search engines"
									/>
								</div>

								{/* Description */}
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<Label htmlFor="seo-desc">Meta Description</Label>
										<span
											className={`text-xs ${
												descLength > 160
													? "text-destructive"
													: "text-muted-foreground"
											}`}
										>
											{descLength}/160
										</span>
									</div>
									<Textarea
										id="seo-desc"
										value={form.description}
										onChange={(e) =>
											setForm({ ...form, description: e.target.value })
										}
										placeholder="Brief description for search engines"
										rows={3}
									/>
								</div>

								{/* Keywords */}
								<div className="space-y-2">
									<Label htmlFor="seo-keywords">
										Keywords (comma-separated)
									</Label>
									<Input
										id="seo-keywords"
										value={form.keywords?.join(", ") || ""}
										onChange={(e) =>
											setForm({
												...form,
												keywords: e.target.value
													.split(",")
													.map((k) => k.trim())
													.filter(Boolean),
											})
										}
										placeholder="real estate, homes, properties"
									/>
								</div>

								{/* Google Preview */}
								<div>
									<Label className="mb-3 block">Google Search Preview</Label>
									<div className="rounded-lg border bg-card p-4 space-y-1">
										<p className="text-sm text-blue-600 dark:text-blue-400 line-clamp-1">
											{form.title || "Page Title"}
										</p>
										<p className="text-xs text-green-700 dark:text-green-500">
											estatehub.com/{p.key === "home" ? "" : p.key}
										</p>
										<p className="text-sm text-muted-foreground line-clamp-2">
											{form.description ||
												"Page description will appear here..."}
										</p>
									</div>
								</div>

								<Button onClick={handleSave}>
									<Save className="h-4 w-4 mr-2" />
									{saved ? "Saved ✓" : `Save ${p.label} SEO`}
								</Button>
							</CardContent>
						</Card>
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
