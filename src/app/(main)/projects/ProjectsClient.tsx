"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SectionContainer } from "@/components/ui/section-container";
import { useProjects } from "@/hooks/useProjects";
import { useProperties } from "@/hooks/useProperties";
import { useProjectsContent } from "@/hooks/useProjectsContent";
import { useLanguage } from "@/context/LanguageContext";
import { formatCurrency } from "@/lib/utils";
import type { Property } from "@/types";
import {
	ArrowRight,
	CheckCircle2,
	Search,
	X,
	MapPin,
	CalendarCheck,
	Compass,
	Trees,
	GraduationCap,
	HeartPulse,
	ShoppingBag,
	Landmark,
	ChevronRight,
	Phone,
	Mail,
	Flame,
	Building2,
	Sparkles,
	Layers,
	Tag,
} from "lucide-react";

type StatusFilter = "all" | Property["status"];
type CategoryFilter = "all" | "residential" | "commercial" | "featured";
type SortOption = "newest" | "price-asc" | "price-desc" | "area-desc";

const AMENITY_ICONS: Record<number, any> = {
	0: Landmark,
	1: Trees,
	2: Compass,
	3: GraduationCap,
	4: HeartPulse,
	5: ShoppingBag,
};

export function ProjectsClient() {
	const { data: content } = useProjectsContent();
	const { projects } = useProjects();
	const { properties } = useProperties();
	const { isBn } = useLanguage();

	// Inventory Filters State
	const [searchQuery, setSearchQuery] = useState("");
	const [activeStatus, setActiveStatus] = useState<StatusFilter>("all");
	const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
	const [sortBy, setSortBy] = useState<SortOption>("newest");

	const statusFilters = [
		{ value: "all" as StatusFilter, label: isBn ? "সকল স্ট্যাটাস" : "All Status" },
		{
			value: "available" as StatusFilter,
			label: isBn ? "বুকিং উন্মুক্ত" : "Available",
		},
		{
			value: "pending" as StatusFilter,
			label: isBn ? "বুকড / প্রক্রিয়াধীন" : "Booked / In Process",
		},
		{
			value: "sold" as StatusFilter,
			label: isBn ? "হস্তান্তরিত / সোল্ড" : "Sold Out",
		},
	];

	const categoryFilters = [
		{ value: "all" as CategoryFilter, label: isBn ? "সকল প্লট" : "All Plots" },
		{
			value: "residential" as CategoryFilter,
			label: isBn ? "আবাসিক প্লট" : "Residential Plots",
		},
		{
			value: "commercial" as CategoryFilter,
			label: isBn ? "বাণিজ্যিক প্লট" : "Commercial Plots",
		},
		{
			value: "featured" as CategoryFilter,
			label: isBn ? "ফিচার্ড প্লট" : "Featured Plots",
		},
	];

	const sortOptions = [
		{ value: "newest" as SortOption, label: isBn ? "নতুনতম" : "Newest" },
		{
			value: "price-asc" as SortOption,
			label: isBn ? "মূল্য: কম থেকে বেশি" : "Price: Low to High",
		},
		{
			value: "price-desc" as SortOption,
			label: isBn ? "মূল্য: বেশি থেকে কম" : "Price: High to Low",
		},
		{
			value: "area-desc" as SortOption,
			label: isBn ? "আয়তন: বড় থেকে ছোট" : "Area: Large to Small",
		},
	];

	// Filtered Inventory
	const filteredProjects = useMemo(() => {
		let result = [...properties];

		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase();
			result = result.filter(
				(p) =>
					p.title.toLowerCase().includes(q) ||
					p.location.toLowerCase().includes(q) ||
					(p.block && p.block.toLowerCase().includes(q)) ||
					(p.roadWidth && p.roadWidth.toLowerCase().includes(q)) ||
					(p.facing && p.facing.toLowerCase().includes(q)) ||
					(p.katha && String(p.katha).includes(q)) ||
					(p.bedrooms && String(p.bedrooms).includes(q)) ||
					(Array.isArray(p.features) &&
						p.features.some((f) => f.toLowerCase().includes(q))) ||
					p.description.toLowerCase().includes(q),
			);
		}

		if (activeStatus !== "all") {
			result = result.filter((p) => p.status === activeStatus);
		}

		if (activeCategory !== "all") {
			if (activeCategory === "residential") {
				result = result.filter(
					(p) =>
						p.category === "residential" ||
						p.category === "land" ||
						p.category === "house",
				);
			} else if (activeCategory === "commercial") {
				result = result.filter((p) => p.category === "commercial");
			} else if (activeCategory === "featured") {
				result = result.filter((p) => p.featured === true);
			}
		}

		if (sortBy === "price-asc") {
			result.sort((a, b) => a.price - b.price);
		} else if (sortBy === "price-desc") {
			result.sort((a, b) => b.price - a.price);
		} else if (sortBy === "area-desc") {
			result.sort((a, b) => (b.area || 0) - (a.area || 0));
		} else {
			result.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
			);
		}

		return result;
	}, [properties, searchQuery, activeStatus, activeCategory, sortBy]);

	const defaultTrustMetricsBn = [
		{ value: "১৫০+ একর", label: "পরিকল্পিত টাউনশিপ এলাকা" },
		{ value: "১৬–১৮ ফুট", label: "উঁচু বালু ভরাটকৃত জমি" },
		{ value: "৩০ ও ৪০ ফুট", label: "প্রশস্ত অভ্যন্তরীণ রাস্তা" },
		{ value: "১০০% রেডি", label: "নিষ্কণ্টক মালিকানা ও মিউটেশন" },
	];

	const trustMetrics = (content.trustMetrics || []).map((tm, idx) => ({
		value: isBn
			? tm.valueBn || defaultTrustMetricsBn[idx]?.value || tm.value
			: tm.value,
		label: isBn
			? tm.labelBn || defaultTrustMetricsBn[idx]?.label || tm.label
			: tm.label,
	}));

	const defaultSpecsBn = [
		{
			num: "০১",
			title: "১৬ থেকে ১৮ ফুট উঁচু মাটি ভরাট",
			desc: "বন্যা সীমা থেকে ১৬–১৮ ফুট উঁচু বালু ভরাটকৃত স্থায়ী সমতল ভূমি যা সম্পূর্ণ জলাবদ্ধতামুক্ত।",
		},
		{
			num: "০২",
			title: "৩০ ও ৪০ ফুট প্রশস্ত আরসিসি সড়ক",
			desc: "মসৃণ ও নিরবচ্ছিন্ন যানবাহন চলাচলের জন্য সুপরিকল্পিত আরসিসি রাস্তা নেটওয়ার্ক।",
		},
		{
			num: "০৩",
			title: "১০০% নিষ্কণ্টক নামজারি ও সাব-রেজিস্ট্রি",
			desc: "সিএস, এসএ, আরএস ও বিএস রেকর্ড যাচাইকৃত স্বচ্ছ দলিল ও তাৎক্ষণিক রেজিস্ট্রেশন সুবিধা।",
		},
		{
			num: "০৪",
			title: "মোহাম্মদপুর থেকে মাত্র ১৫ মিনিটের দূরত্ব",
			desc: "তুরাগ নদীর তীরে কৌশলগত যোগাযোগ করিডোরে অবস্থিত হওয়ায় ঢাকার কেন্দ্রস্থলে দ্রুত যাতায়াত।",
		},
	];

	const specs = (content.specs || []).map((spec, idx) => ({
		num: isBn ? spec.numBn || defaultSpecsBn[idx]?.num || spec.num : spec.num,
		title: isBn
			? spec.titleBn || defaultSpecsBn[idx]?.title || spec.title
			: spec.title,
		desc: isBn
			? spec.descBn || defaultSpecsBn[idx]?.desc || spec.desc
			: spec.desc,
	}));

	const defaultAmenitiesBn = [
		{
			title: "গ্র্যান্ড সেন্ট্রাল জামে মসজিদ",
			desc: "সুবিশাল দৃষ্টিনন্দন সেন্ট্রাল মসজিদ এবং প্রতিটি ব্লকে নামাজের পৃথক ব্যবস্থা।",
			tag: "আধ্যাত্মিক কেন্দ্র",
		},
		{
				</div>
			</SectionContainer>
		</div>
	);
}
