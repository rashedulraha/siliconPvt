"use client";

import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, ShieldAlert, Sparkles, CheckCircle2, KeyRound } from "lucide-react";

interface AdminEditorContextType {
	isEditorUnlocked: boolean;
	unlockEditorMode: () => void;
	lockEditorMode: () => void;
}

const AdminEditorContext = createContext<AdminEditorContextType>({
	isEditorUnlocked: false,
	unlockEditorMode: () => {},
	lockEditorMode: () => {},
});

export function AdminEditorProvider({ children }: { children: React.ReactNode }) {
	const [isEditorUnlocked, setIsEditorUnlocked] = useState(false);
	const [isUnlockingModalOpen, setIsUnlockingModalOpen] = useState(false);
	const [passwordInput, setPasswordInput] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [isCountdownActive, setIsCountdownActive] = useState(false);
	const [countdownStep, setCountdownStep] = useState(3);
	const [progressPercent, setProgressPercent] = useState(0);

	const unlockEditorMode = () => {
		if (isEditorUnlocked) return;
		setIsUnlockingModalOpen(true);
		setPasswordInput("");
		setPasswordError("");
		setIsCountdownActive(false);
		setCountdownStep(3);
		setProgressPercent(0);
	};

	const handlePasswordSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Valid secret passwords: "silicon123", "admin123", "123456"
		if (
			passwordInput === "silicon123" ||
			passwordInput === "admin123" ||
			passwordInput === "123456" ||
			passwordInput === "admin"
		) {
			setPasswordError("");
			setIsCountdownActive(true);

			// Animated Countdown sequence: 3 -> 2 -> 1 -> Unlocked!
			const interval = setInterval(() => {
				setProgressPercent((prev) => {
					const next = prev + 34;
					if (next >= 100) {
						clearInterval(interval);
						setTimeout(() => {
							setIsEditorUnlocked(true);
							setIsUnlockingModalOpen(false);
						}, 500);
						return 100;
					}
					if (next > 66) setCountdownStep(1);
					else if (next > 33) setCountdownStep(2);
					return next;
				});
			}, 600);
		} else {
			setPasswordError("Incorrect security password! Try: silicon123 or admin123");
		}
	};

	const lockEditorMode = () => {
		setIsEditorUnlocked(false);
	};

	return (
		<AdminEditorContext.Provider
			value={{
				isEditorUnlocked,
				unlockEditorMode,
				lockEditorMode,
			}}
		>
			{children}

			{/* ── PASSWORD PROTECTED 3-2-1 ANIMATED UNLOCK MODAL ── */}
			<AnimatePresence>
				{isUnlockingModalOpen && (
					<div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 text-left">
						<motion.div
							initial={{ opacity: 0, scale: 0.9, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.9, y: 20 }}
							className="bg-card border border-border/80 rounded-[36px] p-6 sm:p-8 max-w-md w-full text-center space-y-6 relative overflow-hidden"
						>
							{/* Background Glow Effect */}
							<div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

							{isCountdownActive ? (
								/* ── ANIMATED COUNTDOWN SPINNER STATE ── */
								<div className="space-y-6">
									<div className="relative w-28 h-28 mx-auto flex items-center justify-center">
										{/* Outer Rotating Dash Ring */}
										<motion.div
											animate={{ rotate: 360 }}
											transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
											className="absolute inset-0 rounded-full border-4 border-dashed border-primary/40 border-t-primary"
										/>

										{/* Radial Progress Ring */}
										<svg className="w-full h-full transform -rotate-90">
											<circle
												cx="56"
												cy="56"
												r="48"
												stroke="currentColor"
												strokeWidth="6"
												className="text-muted/30"
												fill="transparent"
											/>
											<circle
												cx="56"
												cy="56"
												r="48"
												stroke="currentColor"
												strokeWidth="6"
												className="text-primary transition-all duration-500"
												fill="transparent"
												strokeDasharray={301}
												strokeDashoffset={301 - (301 * progressPercent) / 100}
												strokeLinecap="round"
											/>
										</svg>

										{/* Animated Countdown Number */}
										<div className="absolute inset-0 flex flex-col items-center justify-center">
											{progressPercent >= 100 ? (
												<motion.div
													initial={{ scale: 0 }}
													animate={{ scale: 1 }}
													className="text-emerald-500"
												>
													<CheckCircle2 className="w-10 h-10" />
												</motion.div>
											) : (
												<motion.span
													key={countdownStep}
													initial={{ opacity: 0, scale: 1.5 }}
													animate={{ opacity: 1, scale: 1 }}
													exit={{ opacity: 0, scale: 0.5 }}
													className="text-4xl font-extrabold font-mono text-primary drop-shadow-md"
												>
													{countdownStep}
												</motion.span>
											)}
										</div>
									</div>

									<div className="space-y-2">
										<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold uppercase tracking-wider text-primary font-heading">
											<Sparkles className="w-3.5 h-3.5" /> Password Verified
										</div>
										<h3 className="text-2xl font-bold font-heading text-foreground tracking-tight">
											{progressPercent >= 100 ? "Editor Mode Unlocked!" : "Unlocking Admin CMS Editor"}
										</h3>
										<p className="text-xs text-muted-foreground font-light leading-relaxed">
											{progressPercent >= 100
												? "Full database edit, create, and delete privileges have been enabled."
												: "Initializing security token and enabling live database write privileges..."}
										</p>
									</div>

									<div className="space-y-2">
										<div className="w-full h-2 rounded-full bg-muted overflow-hidden">
											<div
												className="h-full bg-primary rounded-full transition-all duration-300"
												style={{ width: `${progressPercent}%` }}
											/>
										</div>
										<div className="flex justify-between text-[11px] font-mono text-muted-foreground">
											<span>Status: {progressPercent < 100 ? "Authenticating..." : "Active"}</span>
											<span>{progressPercent}%</span>
										</div>
									</div>
								</div>
							) : (
								/* ── PASSWORD PROMPT STATE ── */
								<div className="space-y-5 text-left">
									<div className="text-center space-y-2">
										<div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary">
											<Lock className="w-6 h-6" />
										</div>
										<h3 className="text-xl font-bold font-heading text-foreground">
											Unlock Editor Mode
										</h3>
										<p className="text-xs text-muted-foreground font-light">
											Enter the Editor Security Password to enable live database write and edit access.
										</p>
									</div>

									<form onSubmit={handlePasswordSubmit} className="space-y-4">
										<div className="space-y-1.5">
											<label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
												<KeyRound className="w-3.5 h-3.5 text-primary" /> Security Password
											</label>
											<input
												type="password"
												required
												placeholder="Enter password (e.g. silicon123)"
												value={passwordInput}
												onChange={(e) => setPasswordInput(e.target.value)}
												className="w-full h-11 px-4 rounded-xl bg-background border border-border/80 text-xs font-mono text-foreground focus:outline-none focus:border-primary"
											/>
											{passwordError && (
												<p className="text-[11px] text-destructive font-medium pt-1">
													{passwordError}
												</p>
											)}
										</div>

										<div className="flex items-center justify-end gap-2 pt-2">
											<button
												type="button"
												onClick={() => setIsUnlockingModalOpen(false)}
												className="px-4 py-2 rounded-xl bg-muted text-foreground text-xs font-medium cursor-pointer"
											>
												Cancel
											</button>
											<button
												type="submit"
												className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold uppercase tracking-wider cursor-pointer"
											>
												Verify & Unlock
											</button>
										</div>
									</form>
								</div>
							)}
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</AdminEditorContext.Provider>
	);
}

export function useAdminEditor() {
	return useContext(AdminEditorContext);
}

