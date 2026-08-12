"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	Save,
	Building2,
	Phone,
	Mail,
	MapPin,
	Clock,
	CheckCircle2,
	Loader2,
	Lock,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useCMS } from "@/context/CMSContext";
import { apiFetch } from "@/lib/api-client";
import { useAdminEditor } from "@/context/AdminEditorContext";

export default function SiteSettingsPage() {
	const { isEditorUnlocked, unlockEditorMode } = useAdminEditor();
	const { state, dispatch } = useCMS();
	const [address, setAddress] = useState(
		"Level 12, Silicon Tower, Mohammadpur Beribadh Link Road, Dhaka 1207",
	);
	const [phone, setPhone] = useState("+880 1711-000000");
	const [hotline, setHotline] = useState("16222");
	const [email, setEmail] = useState("info@siliconrealestatepvtltd.com");
	const [weekend, setWeekend] = useState(
		"Open Saturday to Thursday (Friday Closed)",
	);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [savedMessage, setSavedMessage] = useState("");

	useEffect(() => {
		async function loadSettings() {
			try {
				const res = await apiFetch<{ success: boolean; settings?: any }>(
					"/settings",
				);
				if (res && res.success && res.settings) {
					setAddress(res.settings.address || address);
					setPhone(res.settings.phone || phone);
					setHotline(res.settings.hotline || hotline);
					setEmail(res.settings.email || email);
				}
			} catch (e) {
				console.error("Failed to load settings", e);
			} finally {
				setLoading(false);
			}
		}
		loadSettings();
	}, []);

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isEditorUnlocked) {
			unlockEditorMode();
			return;
		}
		setSaving(true);
		try {
			await apiFetch("/settings", {
				method: "POST",
				body: JSON.stringify({
					address,
					phone,
					hotline,
					email,
				}),
			});

			dispatch({
				type: "UPDATE_SITE_SETTINGS",
				payload: {
					address,
					contactPhone: phone,
					contactEmail: email,
					businessHours: weekend,
				},
			});

			setSavedMessage("Site settings saved to PostgreSQL database!");
			setTimeout(() => setSavedMessage(""), 3000);
		} catch (e) {
			console.error("Failed to update site settings", e);
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className="bg-background text-foreground min-h-screen pb-24 text-left">
			{/* Top Header */}
			<div className="border-b border-border/50 bg-card/60 backdrop-blur-md sticky top-0 z-30 py-4">
				<SectionContainer>
					<div className="flex items-center justify-between">
						<Link
							href="/admin"
							className="text-xs font-medium font-heading text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
						>
							<ArrowLeft className="w-4 h-4" />
							Back to Admin Panel
						</Link>
						<button
							onClick={handleSave}
							disabled={saving || !isEditorUnlocked}
							className="px-4 h-9 rounded-xl bg-primary text-primary-foreground text-xs font-medium font-heading inline-flex items-center gap-1.5 transition-all shadow-none hover:bg-primary/90 cursor-pointer disabled:opacity-50"
						>
							{saving ? (
								<Loader2 className="w-3.5 h-3.5 animate-spin" />
							) : !isEditorUnlocked ? (
								<Lock className="w-3.5 h-3.5" />
							) : (
								<Save className="w-3.5 h-3.5" />
							)}
							{isEditorUnlocked ? "Save Site Settings" : "Unlock to Save"}
						</button>
					</div>
				</SectionContainer>
			</div>

			<SectionContainer className="py-10">
				<div className="max-w-3xl mx-auto space-y-8">
					{/* Lock Notice Banner */}
					{!isEditorUnlocked && (
						<div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-medium flex items-center justify-between gap-4">
							<div className="flex items-center gap-2">
								<Lock className="w-4 h-4 shrink-0" />
								<span>
									<strong>Read-Only Mode Active:</strong> Settings are read-only
									until Editor Mode is unlocked.
								</span>
							</div>
							<button
								onClick={unlockEditorMode}
								className="px-3 py-1.5 rounded-lg bg-amber-500 text-black text-[11px] font-bold uppercase tracking-wider hover:bg-amber-400 shrink-0 cursor-pointer"
							>
								Unlock Editor
							</button>
						</div>
					)}

					<div className="space-y-1 text-left">
						<span className="text-xs font-semibold uppercase tracking-widest text-primary font-heading">
							LIVE DATABASE CONTROL
						</span>
						<h1 className="text-3xl font-semibold font-heading text-foreground tracking-tight">
							Site Content & Corporate Settings
						</h1>
						<p className="text-xs sm:text-sm text-muted-foreground font-light">
							Edit corporate office address, contact hotline numbers, official
							email, and office schedule.
						</p>
					</div>

					{savedMessage && (
						<div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-medium flex items-center gap-2">
							<CheckCircle2 className="w-4 h-4 shrink-0" />
							<span>{savedMessage}</span>
						</div>
					)}

					{loading ? (
						<div className="p-12 text-center text-muted-foreground text-sm flex items-center justify-center gap-2">
							<Loader2 className="w-5 h-5 animate-spin text-primary" />
							<span>Loading settings from database...</span>
						</div>
					) : (
						<form
							onSubmit={handleSave}
							className="bg-card border border-border/80 rounded-3xl p-8 shadow-none space-y-6"
						>
							{/* Corporate Address */}
							<div className="space-y-1.5 text-left">
								<label className="text-xs font-medium font-heading text-foreground flex items-center gap-2">
									<MapPin className="w-3.5 h-3.5 text-primary" />
									Corporate Office Address
								</label>
								<textarea
									rows={2}
									disabled={!isEditorUnlocked}
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									className="w-full p-3 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
								/>
							</div>

							{/* Contact Phones */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-1.5 text-left">
									<label className="text-xs font-medium font-heading text-foreground flex items-center gap-2">
										<Phone className="w-3.5 h-3.5 text-primary" />
										Contact Hotline Number
									</label>
									<input
										type="text"
										disabled={!isEditorUnlocked}
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										className="w-full h-11 px-3 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
									/>
								</div>

								<div className="space-y-1.5 text-left">
									<label className="text-xs font-medium font-heading text-foreground flex items-center gap-2">
										<Phone className="w-3.5 h-3.5 text-primary" />
										Short Code Hotline
									</label>
									<input
										type="text"
										disabled={!isEditorUnlocked}
										value={hotline}
										onChange={(e) => setHotline(e.target.value)}
										className="w-full h-11 px-3 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary disabled:opacity-60"
									/>
								</div>
							</div>

							{/* Official Email */}
							<div className="space-y-1.5 text-left">
								<label className="text-xs font-medium font-heading text-foreground flex items-center gap-2">
									<Mail className="w-3.5 h-3.5 text-primary" />
									Official Corporate Email
								</label>
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full h-11 px-3 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary"
								/>
							</div>

							{/* Office Schedule */}
							<div className="space-y-1.5 text-left">
								<label className="text-xs font-medium font-heading text-foreground flex items-center gap-2">
									<Clock className="w-3.5 h-3.5 text-primary" />
									Weekly Office Hours & Closed Days
								</label>
								<input
									type="text"
									value={weekend}
									onChange={(e) => setWeekend(e.target.value)}
									className="w-full h-11 px-3 rounded-xl bg-background border border-border/60 text-xs font-light text-foreground focus:outline-none focus:border-primary"
								/>
							</div>

							<button
								type="submit"
								disabled={saving}
								className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-medium font-heading text-xs sm:text-sm inline-flex items-center justify-center gap-2 hover:bg-primary/90 transition-all cursor-pointer"
							>
								{saving ? (
									<Loader2 className="w-4 h-4 animate-spin" />
								) : (
									<Save className="w-4 h-4" />
								)}
								SAVE SETTINGS TO DATABASE
							</button>
						</form>
					)}
				</div>
			</SectionContainer>
		</div>
	);
}
