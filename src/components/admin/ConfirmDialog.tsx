"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description: string;
	confirmText?: string;
	cancelText?: string;
	variant?: "destructive" | "default";
	onConfirm: () => void;
}

export function ConfirmDialog({
	open,
	onOpenChange,
	title,
	description,
	confirmText = "Confirm",
	cancelText = "Cancel",
	variant = "destructive",
	onConfirm,
}: ConfirmDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[400px] rounded-2xl p-6 bg-white  border border-slate-200  shadow-2xl font-roboto text-left">
				<DialogHeader className="space-y-2 text-left">
					<DialogTitle className="font-heading text-lg font-bold text-slate-900 tracking-tight">
						{title}
					</DialogTitle>
					<DialogDescription className="text-sm text-slate-600 leading-relaxed">
						{description}
					</DialogDescription>
				</DialogHeader>

				<DialogFooter className="mt-6 flex items-center justify-end gap-2.5">
					<button
						type="button"
						onClick={() => onOpenChange(false)}
						className="h-9 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold font-heading transition-all cursor-pointer shadow-xs active:scale-[0.98]"
					>
						{cancelText}
					</button>
					<button
						type="button"
						onClick={() => {
							onConfirm();
							onOpenChange(false);
						}}
						className={`h-9 px-5 rounded-xl text-xs font-bold font-heading text-white transition-all cursor-pointer shadow-xs active:scale-[0.98] ${
							variant === "destructive"
								? "bg-red-600 hover:bg-red-700 shadow-red-600/20"
								: "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20"
						}`}
					>
						{confirmText}
					</button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
