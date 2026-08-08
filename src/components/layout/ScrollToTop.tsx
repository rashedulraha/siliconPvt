"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ScrollToTop() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > 400);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<AnimatePresence>
			{visible && (
				<motion.button
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.8 }}
					onClick={scrollToTop}
					className="fixed bottom-24 right-6 z-30 h-11 w-11 rounded-full bg-background border shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
					aria-label="Scroll to top"
				>
					<ArrowUp className="h-4 w-4" />
				</motion.button>
			)}
		</AnimatePresence>
	);
}
