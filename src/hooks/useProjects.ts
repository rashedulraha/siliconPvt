"use client";

import { useState, useEffect, useCallback } from "react";
import { apiFetch } from "@/lib/api-client";

export interface ProjectItem {
	id: string;
	num?: string;
	title: string;
	titleBn?: string;
	slug?: string;
	type: string;
	typeBn?: string;
	status: string;
	statusBn?: string;
	location: string;
	locationBn?: string;
	description: string;
	descriptionBn?: string;
	images: string[];
	highlights: string[];
	highlightsBn?: string[];
	demoUrl?: string;
	clientInfo?: string;
	order: number;
	active: boolean;
}

export const DEFAULT_PORTFOLIO_PROJECTS: ProjectItem[] = [];

export function useProjects() {
	const [projects, setProjects] = useState<ProjectItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchProjects = useCallback(async () => {
		setLoading(true);
		try {
			const res = await apiFetch<{
				success: boolean;
				projects?: ProjectItem[];
			}>("/projects");
			const items = Array.isArray(res?.projects)
				? res.projects
				: Array.isArray(res)
					? (res as any)
					: [];
			setProjects(items);
		} catch (err: any) {
			console.error("[useProjects] Failed to fetch projects:", err);
			setError(err.message || "Failed to load projects");
			setProjects([]);
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
