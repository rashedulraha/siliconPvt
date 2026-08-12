"use client";

import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UnlockEditorModalProps {
	isOpen: boolean;
	onClose: () => void;
	onVerify: (password: string) => boolean;
}

export function UnlockEditorModal({
	isOpen,
	onClose,
	onVerify,
}: UnlockEditorModalProps) {
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [shake, setShake] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!password.trim()) {
			setError("Password is required");
			triggerShake();
			return;
		}

		const success = onVerify(password);
		if (success) {
			setPassword("");
			setError("");
			onClose();
		} else {
			setError("Incorrect password.");
			triggerShake();
		}
	};

	const triggerShake = () => {
		setShake(true);
		setTimeout(() => setShake(false), 500);
	};

	const handleClose = () => {
		setPassword("");
		setError("");
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
			<DialogContent className="sm:max-w-md border border-border/80 bg-card/95 backdrop-blur-xl shadow-2xl rounded-3xl p-6 overflow-hidden">
				{/* Background Glow */}
				<div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary/10 blur-2xl pointer-events-none" />

				<DialogHeader className="space-y-3 text-left">
					<div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
						<ShieldCheck className="h-6 w-6" />
					</div>
					<div>
						<DialogTitle className="text-xl font-bold font-heading text-foreground">
							Unlock Editor Mode
						</DialogTitle>
						<DialogDescription className="text-xs text-muted-foreground font-light mt-1">
							Enter the admin password to unlock editing, deleting, and upload capabilities across the dashboard.
						</DialogDescription>
					</div>
				</DialogHeader>

				<motion.form
					onSubmit={handleSubmit}
					animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
					transition={{ duration: 0.4 }}
					className="space-y-4 mt-2"
				>
					<div className="space-y-2 text-left">
						<label
							htmlFor="editor-password"
							className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5"
						>
							<KeyRound className="w-3.5 h-3.5" /> Admin Password
						</label>
						<div className="relative">
							<Input
								id="editor-password"
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
									if (error) setError("");
								}}
								placeholder="Enter admin password..."
								className={`pr-10 h-11 rounded-xl text-sm font-medium border ${
									error
										? "border-destructive focus-visible:ring-destructive"
										: "border-input"
								}`}
								autoFocus
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
								aria-label={showPassword ? "Hide password" : "Show password"}
							>
								{showPassword ? (
									<EyeOff className="w-4 h-4" />
								) : (
									<Eye className="w-4 h-4" />
								)}
							</button>
						</div>

						<AnimatePresence>
							{error && (
								<motion.div
									initial={{ opacity: 0, y: -4 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0 }}
									className="flex items-center gap-1.5 text-xs text-destructive font-medium mt-1.5"
								>
									<AlertCircle className="w-3.5 h-3.5 shrink-0" />
									<span>{error}</span>
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					<div className="flex items-center justify-end gap-2 pt-2">
						<Button
							type="button"
							variant="outline"
							onClick={handleClose}
							className="rounded-xl h-10 px-4 text-xs font-semibold"
						>
							Cancel
						</Button>
						<Button
							type="submit"
							className="rounded-xl h-10 px-5 text-xs font-bold font-heading uppercase tracking-wider gap-2 shadow-md"
						>
							<Lock className="w-3.5 h-3.5" />
							Unlock Editor
						</Button>
					</div>
				</motion.form>
			</DialogContent>
		</Dialog>
	);
}
