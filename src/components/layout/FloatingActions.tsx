"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useCMS } from "@/context/CMSContext";

export function FloatingActions() {
	const { state } = useCMS();

	// Derive the contact phone: CMS value takes priority, env var is the fallback
	const contactPhone =
		state.siteSettings.contactPhone || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

	// Strip all non-digit characters for the wa.me URL
	const digits = contactPhone ? contactPhone.replace(/\D/g, "") : "";

	const whatsappUrl = `https://wa.me/${digits}?text=Hello%2C%20I%20am%20interested%20in%20your%20properties.`;

	return (
		<>
			{/* Floating action buttons (bottom-right) */}
			<div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3">
				{/* WhatsApp button — only rendered when a phone number is available */}
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
						aria-label="Chat on WhatsApp"
					>
						<MessageCircle className="h-6 w-6" />
						<span className="absolute right-full mr-3 whitespace-nowrap rounded-md bg-background px-3 py-1.5 text-sm font-medium shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-foreground border border-border">
							Chat with us
						</span>
					</motion.a>
				)}
			</div>
		</>
	);
}

