"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api-client";

export interface ProjectItem {
	id: string;
	num?: string;
	title: string;
	slug?: string;
	type: string;
	status: "Ongoing" | "Upcoming" | "Completed" | string;
	location: string;
	description: string;
	images: string[];
	highlights: string[];
	demoUrl?: string;
	clientInfo?: string;
	order: number;
	active: boolean;
}

export const DEFAULT_PORTFOLIO_PROJECTS: ProjectItem[] = [
	{
		id: "proj-1",
		num: "01",
		title: "Silicon City (Phase 1 & 2)",
		type: "Ongoing Flagship Township",
		status: "Ongoing",
		location: "Bara Badeshi Mouza, Savar, Dhaka (Mohammadpur Adjacent)",
		description:
			"High-value residential township along the scenic Turag River with ready civic infrastructure, 30ft & 40ft wide internal roads, grand central mosque, and community parks.",
		images: [
			"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
		],
		highlights: [
			"30ft & 40ft Wide Roads",
			"Turag River Bridge Link",
			"16–18ft Soil Earthwork",
			"100% Legal Ownership",
		],
		demoUrl: "/projects#inventory-section",
		clientInfo: "Silicon Real Estate (Pvt.) Ltd.",
		order: 1,
		active: true,
	},
	{
		id: "proj-2",
		num: "02",
		title: "Silicon Heights",
		type: "Upcoming Eco-Friendly Apartments",
		status: "Upcoming",
		location: "Mohammadpur Waterfront Zone, Dhaka",
		description:
			"Premium eco-friendly ready apartment buildings featuring modern security systems, high-speed elevators, backup power, and scenic river-facing balconies.",
		images: [
			"https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
		],
		highlights: [
			"Eco-Friendly Architecture",
			"River-Facing Balconies",
			"24/7 Elevator & Security",
			"Modern Community Amenities",
		],
		demoUrl: "/projects#inventory-section",
		clientInfo: "Silicon Real Estate (Pvt.) Ltd.",
		order: 2,
		active: true,
	},
	{
		id: "proj-3",
		num: "03",
		title: "Silicon Commercial Center",
		type: "Upcoming Business Complex",
		status: "Upcoming",
		location: "Mohammadpur Beribadh Main Road, Dhaka",
		description:
			"Dedicated business complex featuring retail shops, diagnostic centers, corporate office floors, and commercial banking outlets for high ROI investments.",
		images: [
			"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
		],
		highlights: [
			"Corporate Banking Outlets",
			"Retail Shopping Hub",
			"Diagnostic & Healthcare Floors",
			"High Commercial Footfall",
		],
		demoUrl: "/projects#inventory-section",
		clientInfo: "Silicon Real Estate (Pvt.) Ltd.",
		order: 3,
		active: true,
	},
	{
		id: "proj-4",
		num: "04",
		title: "Silicon Green Valley",
		type: "Completed Residential Block",
		status: "Completed",
		location: "Purbachal Sector Link Zone, Dhaka",
		description:
			"Fully developed and handed-over residential plot sector featuring tree-lined avenues, underground utilities, and 100% boundary demarcation.",
		images: [
			"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
		],
		highlights: [
			"100% Handover Completed",
			"Tree-Lined Avenues",
			"Underground Utility Lines",
			"Boundary Demarcation Complete",
		],
		demoUrl: "/projects#inventory-section",
		clientInfo: "Silicon Real Estate (Pvt.) Ltd.",
		order: 4,
		active: true,
	},
];

export function useProjects() {
	const [projects, setProjects] = useState<ProjectItem[]>(
		DEFAULT_PORTFOLIO_PROJECTS,
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchProjects = useCallback(async () => {
		setLoading(true);
		try {
			const res = await apiFetch<{
				success: boolean;
				projects?: ProjectItem[];
			}>("/projects");
			if (res && res.success && res.projects && res.projects.length > 0) {
				setProjects(res.projects);
			}
		} catch (err: any) {
			console.error("[useProjects] Failed to fetch projects:", err);
			setError(err.message || "Failed to load projects");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchProjects();
	}, [fetchProjects]);

	const createProject = useCallback(async (data: Omit<ProjectItem, "id">) => {
		try {
			const res = await apiFetch<{ success: boolean; project?: ProjectItem }>(
				"/projects",
				{
					method: "POST",
					body: JSON.stringify(data),
				},
			);
			if (res && res.project) {
				setProjects((prev) => [...prev, res.project!]);
				return res.project;
			}
		} catch (err: any) {
			console.error("[useProjects] Failed to create project:", err);
			throw err;
		}
	}, []);

	const updateProject = useCallback(
		async (id: string, data: Partial<ProjectItem>) => {
			try {
				const res = await apiFetch<{ success: boolean; project?: ProjectItem }>(
					`/projects/${id}`,
					{
						method: "PUT",
						body: JSON.stringify(data),
					},
				);
				if (res && res.project) {
					setProjects((prev) =>
						prev.map((p) => (p.id === id ? res.project! : p)),
					);
				} else {
					setProjects((prev) =>
						prev.map((p) => (p.id === id ? { ...p, ...data } : p)),
					);
				}
				return true;
			} catch (err: any) {
				console.error("[useProjects] Failed to update project:", err);
				throw err;
			}
		},
		[],
	);

	const deleteProject = useCallback(async (id: string) => {
		try {
			await apiFetch(`/projects/${id}`, { method: "DELETE" });
			setProjects((prev) => prev.filter((p) => p.id !== id));
			return true;
		} catch (err: any) {
			console.error("[useProjects] Failed to delete project:", err);
			throw err;
		}
	}, []);

	return {
		projects,
		loading,
		error,
		refetch: fetchProjects,
		createProject,
		updateProject,
		deleteProject,
	};
}
