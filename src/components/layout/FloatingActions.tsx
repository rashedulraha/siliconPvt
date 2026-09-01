"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useCMS } from "@/context/CMSContext";
import { useLanguage } from "@/context/LanguageContext";

export function FloatingActions() {
	const { state } = useCMS();
	const { isBn } = useLanguage();

	// Derive the contact phone: CMS value takes priority, env var is the fallback
	const contactPhone =
		state.siteSettings.contactPhone ||
		process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
		"+8801712345678";

	// Strip all non-digit characters for the wa.me URL
	const digits = contactPhone ? contactPhone.replace(/\D/g, "") : "";

	const message = isBn
		? encodeURIComponent("আসসালামু আলাইকুম, আমি সিলিকন সিটির প্লট সম্পর্কে জানতে আগ্রহী।")
		: encodeURIComponent(
				"Hello, I am interested in Silicon City residential plots.",
			);

	const whatsappUrl = `https://wa.me/${digits}?text=${message}`;

	return (
		<>
			{/* Floating action buttons (bottom-right) */}
			<div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
				{digits && (
					<motion.a
						href={whatsappUrl}
						target="_blank"
						rel="noopener noreferrer"
						data-testid="whatsapp-button"
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ type: "spring", stiffness: 300, damping: 20 }}
						className="h-14 w-14 rounded-full bg-whatsapp hover:bg-whatsapp/85 text-white shadow-xl hover:shadow-2xl transition-all flex items-center justify-center group"
						aria-label={isBn ? "হোয়াটসঅ্যাপে যোগাযোগ করুন" : "Chat on WhatsApp"}
					>
						<MessageCircle className="h-6 w-6" />
						<span className="absolute right-full mr-3 whitespace-nowrap rounded-xl bg-card/95 backdrop-blur-md px-3 py-1.5 text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-foreground border border-border/80">
							{isBn ? "হোয়াটসঅ্যাপে চ্যাট করুন" : "Chat with us on WhatsApp"}
						</span>
					</motion.a>
				)}
			</div>
		</>
	);
}
