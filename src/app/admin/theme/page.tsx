"use client";

import { useState } from "react";
import { Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ColorPicker } from "@/components/admin/ColorPicker";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useCMS } from "@/context/CMSContext";
import { initialState } from "@/context/CMSContext";

const fontOptions = [
	{ value: "Inter", label: "Inter (Modern Sans)" },
	{ value: "Playfair Display", label: "Playfair Display (Serif)" },
	{ value: "Roboto", label: "Roboto (Neutral)" },
	{ value: "Poppins", label: "Poppins (Friendly)" },
	{ value: "Lato", label: "Lato (Clean)" },
];

export default function ThemePage() {
	const { state, dispatch } = useCMS();
	const [theme, setTheme] = useState(state.theme);
	const [resetOpen, setResetOpen] = useState(false);
	const [saved, setSaved] = useState(false);

	const handleSave = () => {
		dispatch({ type: "UPDATE_THEME", payload: theme });
		setSaved(true);
		setTimeout(() => setSaved(false), 2000);
	};

	const handleReset = () => {
		setTheme(initialState.theme);
		dispatch({ type: "UPDATE_THEME", payload: initialState.theme });
	};

	return (
		<div className="space-y-6 max-w-4xl">
			<Card>
				<CardHeader>
					<div className="flex items-center justify-between">
						<div>
							<CardTitle>Color Palette</CardTitle>
							<CardDescription>
								Customize your brand colors. Changes apply site-wide.
							</CardDescription>
						</div>
						<Button
							variant="outline"
							size="sm"
							onClick={() => setResetOpen(true)}
						>
							<RotateCcw className="h-4 w-4 mr-1" /> Reset
						</Button>
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="grid sm:grid-cols-2 gap-4">
						<ColorPicker
							label="Primary Color"
							value={theme.primaryColor}
							onChange={(v) => setTheme({ ...theme, primaryColor: v })}
						/>
						<ColorPicker
							label="Secondary Color"
							value={theme.secondaryColor}
							onChange={(v) => setTheme({ ...theme, secondaryColor: v })}
						/>
					</div>

					{/* Preview swatches */}
					<div>
						<Label className="mb-2 block">Color Preview</Label>
						<div className="flex gap-3">
							<div
								className="h-16 flex-1 rounded-lg flex items-center justify-center text-white font-medium shadow-sm"
								style={{ backgroundColor: theme.primaryColor }}
							>
								Primary
							</div>
							<div
								className="h-16 flex-1 rounded-lg flex items-center justify-center font-medium shadow-sm"
								style={{ backgroundColor: theme.secondaryColor }}
							>
								Secondary
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Typography</CardTitle>
					<CardDescription>
						Choose the primary font family for your site.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label>Font Family</Label>
						<Select
							value={theme.fontFamily}
							onValueChange={(v) => setTheme({ ...theme, fontFamily: v })}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{fontOptions.map((f) => (
									<SelectItem key={f.value} value={f.value}>
										{f.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="rounded-lg border bg-muted/40 p-6">
						<p className="text-xs text-muted-foreground mb-2">Preview</p>
						<h3 className="text-2xl font-bold mb-2">The quick brown fox</h3>
						<p className="text-muted-foreground">
							Jumps over the lazy dog. This is how body text will appear across
							your site.
						</p>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Appearance Mode</CardTitle>
					<CardDescription>
						Set the default theme mode for visitors.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Select
						value={theme.mode}
						onValueChange={(v) => setTheme({ ...theme, mode: v as any })}
					>
						<SelectTrigger className="max-w-xs">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="light">Light</SelectItem>
							<SelectItem value="dark">Dark</SelectItem>
							<SelectItem value="system">System</SelectItem>
						</SelectContent>
					</Select>
				</CardContent>
			</Card>

			{/* Save */}
			<div className="flex justify-end gap-2 sticky bottom-4">
				<Button onClick={handleSave} size="lg">
					<Save className="h-4 w-4 mr-2" />
					{saved ? "Saved ✓" : "Save Changes"}
				</Button>
			</div>

			<ConfirmDialog
				open={resetOpen}
				onOpenChange={setResetOpen}
				title="Reset Theme"
				description="This will restore default colors and typography."
				confirmText="Reset"
				onConfirm={handleReset}
			/>
		</div>
	);
}
