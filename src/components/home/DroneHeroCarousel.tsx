"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
	ChevronLeft,
	ChevronRight,
	Play,
	Pause,
	Volume2,
	VolumeX,
	ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Slide } from "@/hooks/useSlides";
import {
	extractYouTubeId,
	getYouTubeEmbedUrl,
	DEFAULT_DRONE_VIDEOS,
	DroneVideoItem,
} from "@/lib/youtube";

interface DroneHeroCarouselProps {
	slides: Slide[];
	heroData?: {
		heroBadge?: string;
		heroBadgeBn?: string;
		heroTitle?: string;
		heroTitleBn?: string;
		heroDesc?: string;
		heroDescBn?: string;
		heroBgImage?: string;
		heroVideoUrl?: string;
		sectionsConfig?: {
			heroVideoUrl?: string;
			[key: string]: any;
		};
	};
}

export function DroneHeroCarousel({
	slides,
	heroData,
}: DroneHeroCarouselProps) {
	const { isBn } = useLanguage();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(true);
	const [isMuted, setIsMuted] = useState(true);
	const iframeRef = useRef<HTMLIFrameElement | null>(null);
	const SLIDE_DURATION = 15000; // 15 seconds per drone video slide

	// Construct active slide list from database slides, prioritized by admin dashboard inputs
	const activeSlides = React.useMemo(() => {
		const dashboardVideoUrl =
			heroData?.sectionsConfig?.heroVideoUrl || heroData?.heroVideoUrl || null;
		const dashboardVideoId = extractYouTubeId(dashboardVideoUrl);

		const filtered = slides.filter((s) => s.active);

		if (filtered.length > 0) {
			return filtered.map((slide, index) => {
				const extractedId = extractYouTubeId(slide.link);
				const fallbackVideo =
					DEFAULT_DRONE_VIDEOS[index % DEFAULT_DRONE_VIDEOS.length];

				// Prioritize: 1. Slide YouTube link from dashboard, 2. Global hero video from home settings, 3. Curated preset
				const resolvedYoutubeId =
					extractedId ||
					(index === 0 && dashboardVideoId ? dashboardVideoId : null) ||
					fallbackVideo.id;

				return {
					id: slide.id,
					title: isBn ? slide.titleBn || slide.title : slide.title,
					subtitle: isBn ? slide.subtitleBn || slide.subtitle : slide.subtitle,
					badge:
						(isBn ? slide.badgeBn || slide.badge : slide.badge) ||
						(isBn ? "৪কে ড্রোন ফুটেজ" : "4K DRONE FOOTAGE"),
					image: slide.image || fallbackVideo.poster,
					youtubeId: resolvedYoutubeId,
					link: slide.link || "/projects",
				};
			});
		}

		// Fallback when database has no slides yet
		return DEFAULT_DRONE_VIDEOS.map((dv: DroneVideoItem, idx: number) => ({
			id: dv.id,
			title: isBn ? dv.titleBn : dv.title,
			subtitle: isBn ? dv.subtitleBn : dv.subtitle,
			badge: isBn ? dv.badgeBn : dv.badge,
			image: dv.poster,
			youtubeId: idx === 0 && dashboardVideoId ? dashboardVideoId : dv.id,
			link: "/projects",
		}));
	}, [slides, isBn, heroData]);

	const currentSlide =
		activeSlides[currentIndex] || activeSlides[0] || DEFAULT_DRONE_VIDEOS[0];

	const goToSlide = useCallback((index: number) => {
		setCurrentIndex(index);
	}, []);

	const nextSlide = useCallback(() => {
		goToSlide((currentIndex + 1) % activeSlides.length);
	}, [currentIndex, activeSlides.length, goToSlide]);

	const prevSlide = useCallback(() => {
		goToSlide((currentIndex - 1 + activeSlides.length) % activeSlides.length);
	}, [currentIndex, activeSlides.length, goToSlide]);

	// Auto-advance carousel timer
	useEffect(() => {
		if (!isPlaying || activeSlides.length <= 1) return;

		const timer = setTimeout(() => {
			nextSlide();
		}, SLIDE_DURATION);

		return () => clearTimeout(timer);
	}, [isPlaying, activeSlides.length, currentIndex, nextSlide]);

	// Keyboard arrow navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowRight") nextSlide();
			if (e.key === "ArrowLeft") prevSlide();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [nextSlide, prevSlide]);

	// Listen for YouTube postMessage API events (seamless loop when video ends)
	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			if (!event.data) return;
			try {
				let data = event.data;
				if (typeof data === "string") {
					data = JSON.parse(data);
				}

				const state =
					data?.info?.playerState !== undefined
						? data.info.playerState
						: data?.info;

				// PlayerState 0 === ENDED -> seamless loop without playlist OSD
				if (
					state === 0 ||
					(data?.event === "onStateChange" && data?.info === 0)
				) {
					if (iframeRef.current?.contentWindow) {
						iframeRef.current.contentWindow.postMessage(
							JSON.stringify({
								event: "command",
								func: "seekTo",
								args: [0, true],
							}),
							"*",
						);
						iframeRef.current.contentWindow.postMessage(
							JSON.stringify({
								event: "command",
								func: "playVideo",
								args: [],
							}),
							"*",
						);
					}
				}
			} catch {
				// Ignore non-JSON messages
			}
		};

		window.addEventListener("message", handleMessage);
		return () => window.removeEventListener("message", handleMessage);
	}, []);

	// Handshake on iframe HTML load: initialize listening & guarantee mute for autoplay
	const handleIframeLoad = () => {
		if (iframeRef.current?.contentWindow) {
			// Register listening subscription
			iframeRef.current.contentWindow.postMessage(
				JSON.stringify({ event: "listening" }),
				"*",
			);
			// Guarantee mute for browser autoplay compliance
			if (isMuted) {
				iframeRef.current.contentWindow.postMessage(
					JSON.stringify({
						event: "command",
						func: "mute",
						args: [],
					}),
					"*",
				);
			}
		}
	};

	// Seamless Mute Toggle via postMessage (Zero DOM Re-mount / Zero reload flash)
	const toggleMute = () => {
		const newMuted = !isMuted;
		setIsMuted(newMuted);
		if (iframeRef.current?.contentWindow) {
			iframeRef.current.contentWindow.postMessage(
				JSON.stringify({
					event: "command",
					func: newMuted ? "mute" : "unMute",
					args: [],
				}),
				"*",
			);
		}
	};

	// Carousel Auto-rotation Toggle: Pauses/Resumes slide rotation cleanly without triggering YouTube's pause HUD
	const togglePlay = () => {
		setIsPlaying((prev) => !prev);
	};

	const embedUrl = getYouTubeEmbedUrl(currentSlide.youtubeId, {
		muted: isMuted,
		autoplay: true,
	});

	return (
		<section className="relative w-full h-[100dvh] min-h-[640px] overflow-hidden flex flex-col justify-between select-none bg-slate-950 text-white">
			{/* ── 1. FULLSCREEN DRONE VIDEO BACKGROUND (Direct streaming 4K video, NO fallback image, ZERO on-screen player controls) ── */}
			<div className="absolute inset-0 z-0 overflow-hidden bg-slate-950 pointer-events-none select-none">
				{/* Direct Chunked Streaming YouTube IFrame Player */}
				{currentSlide.youtubeId && (
					<div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center pointer-events-none select-none">
						<iframe
							ref={iframeRef}
							key={currentSlide.youtubeId}
							src={embedUrl}
							title={currentSlide.title}
							onLoad={handleIframeLoad}
							className="w-[140vw] h-[140vh] min-w-[180vh] min-h-[60vw] pointer-events-none select-none object-cover"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							tabIndex={-1}
						/>
					</div>
				)}

				{/* Touch & Interaction Shield: completely blocks any click or tap from reaching YouTube player */}
				<div className="absolute inset-0 z-10 pointer-events-auto cursor-default" />

				{/* Cinematic Vignette Overlay Gradients */}
				<div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/65 pointer-events-none" />
				<div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/50 pointer-events-none" />
				<div className="absolute inset-0 z-10 bg-radial from-transparent via-slate-950/20 to-slate-950/80 pointer-events-none" />
			</div>

			{/* ── 2. CENTER OVERLAY HERO HEADLINE, SUBTITLE & CTAs (Clean, minimal, uncluttered) ── */}
			<div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-8 my-auto flex flex-col items-center text-center">
				<AnimatePresence mode="wait">
					<motion.div
						key={currentSlide.id || currentIndex}
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -16 }}
						transition={{ duration: 0.45, ease: "easeOut" }}
						className="space-y-4 sm:space-y-5 flex flex-col items-center max-w-4xl"
					>
						{/* Clean luxury badge */}
						{currentSlide.badge && (
							<div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-300 font-heading shadow-md">
								<span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
								<span>{currentSlide.badge}</span>
							</div>
						)}

						{/* Hero headline */}
						<h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.12] drop-shadow-2xl">
							{currentSlide.title}
						</h1>

						{/* Clean, readable narrative */}
						{currentSlide.subtitle && (
							<p className="text-sm sm:text-base md:text-lg text-slate-100/95 font-body font-normal max-w-2xl sm:max-w-3xl leading-relaxed drop-shadow-lg">
								{currentSlide.subtitle}
							</p>
						)}

						{/* Clean, elegant Action Buttons */}
						<div className="flex flex-wrap items-center justify-center gap-3 pt-2">
							<Link
								href="/projects"
								className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm font-bold font-heading transition-all duration-200 shadow-xl hover:shadow-primary/30 inline-flex items-center gap-2 cursor-pointer group"
							>
								<span>{isBn ? "প্লটসমূহ দেখুন" : "Explore Plots"}</span>
								<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
							</Link>

							<Link
								href="/contact"
								className="px-6 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-semibold font-heading border border-white/25 backdrop-blur-md transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg"
							>
								<span>{isBn ? "সাইট ভিজিট বুক করুন" : "Book Site Visit"}</span>
							</Link>
						</div>
					</motion.div>
				</AnimatePresence>
			</div>

			{/* ── 3. BOTTOM DOCK: CLEAN CONTROLS (Slide Counter, Navigation, Playback & Mute) ── */}
			<div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-8 pb-6 sm:pb-8">
				{/* Unified Clean Controls: Slide Counter + Prev/Next Arrows, Pause, Mute (No messy tabs) */}
				<div className="flex items-center justify-between gap-4 pt-1">
					{/* Slide Index Counter */}
					<div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/15 text-xs font-mono text-white/80">
						<span className="font-bold text-amber-300">
							{String(currentIndex + 1).padStart(2, "0")}
						</span>
						<span className="text-white/40">/</span>
						<span>{String(activeSlides.length).padStart(2, "0")}</span>
					</div>

					{/* Controls Group: Prev Arrow, Pause/Play, Mute/Unmute, Next Arrow */}
					<div className="flex items-center gap-2">
						{/* Previous Slide Arrow */}
						<button
							type="button"
							onClick={prevSlide}
							aria-label="Previous Drone Video"
							className="w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-800 border border-white/20 hover:border-white/40 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
							title={isBn ? "পূর্ববর্তী ভিডিও" : "Previous Video"}
						>
							<ChevronLeft className="w-4 h-4" />
						</button>

						{/* Pause / Play Toggle */}
						<button
							type="button"
							onClick={togglePlay}
							aria-label={isPlaying ? "Pause" : "Play"}
							className="h-9 px-3 rounded-full bg-slate-900/70 hover:bg-slate-800 border border-white/20 hover:border-white/40 text-white inline-flex items-center gap-1.5 text-xs font-heading font-medium transition-all cursor-pointer shadow-md"
							title={
								isPlaying
									? isBn
										? "পজ করুন"
										: "Pause"
									: isBn
										? "প্লে করুন"
										: "Play"
							}
						>
							{isPlaying ? (
								<Pause className="w-3.5 h-3.5 text-white/80" />
							) : (
								<Play className="w-3.5 h-3.5 text-emerald-400" />
							)}
							<span className="text-[11px] hidden sm:inline">
								{isPlaying ? (isBn ? "পজ" : "Pause") : isBn ? "প্লে" : "Play"}
							</span>
						</button>

						{/* Mute / Unmute Toggle */}
						<button
							type="button"
							onClick={toggleMute}
							aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
							className="h-9 px-3 rounded-full bg-slate-900/70 hover:bg-slate-800 border border-white/20 hover:border-white/40 text-white inline-flex items-center gap-1.5 text-xs font-heading font-medium transition-all cursor-pointer shadow-md"
							title={
								isMuted
									? isBn
										? "সাউন্ড চালু করুন"
										: "Unmute Audio"
									: isBn
										? "সাউন্ড বন্ধ করুন"
										: "Mute Audio"
							}
						>
							{isMuted ? (
								<VolumeX className="w-3.5 h-3.5 text-white/70" />
							) : (
								<Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
							)}
							<span className="text-[11px] hidden sm:inline">
								{isMuted
									? isBn
										? "মিউট"
										: "Muted"
									: isBn
										? "সাউন্ড"
										: "Sound On"}
							</span>
						</button>

						{/* Next Slide Arrow */}
						<button
							type="button"
							onClick={nextSlide}
							aria-label="Next Drone Video"
							className="w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-800 border border-white/20 hover:border-white/40 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
							title={isBn ? "পরবর্তী ভিডিও" : "Next Video"}
						>
							<ChevronRight className="w-4 h-4" />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
