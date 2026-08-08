"use client";

import { useCallback } from "react";
import { useCMS } from "@/context/CMSContext";
import type { Job } from "@/types";
import { generateId, slugify } from "@/lib/utils";

export function useJobs() {
	const { state, dispatch } = useCMS();

	const addJob = useCallback(
		(data: Omit<Job, "id" | "slug" | "postedAt">) => {
			const job: Job = {
				...data,
				id: generateId(),
				slug: slugify(data.title),
				postedAt: new Date().toISOString(),
			};
			dispatch({ type: "ADD_JOB", payload: job });
			return job;
		},
		[dispatch],
	);

	const updateJob = useCallback(
		(id: string, data: Partial<Job>) => {
			const existing = state.jobs.find((j) => j.id === id);
			if (!existing) return null;
			const updated: Job = {
				...existing,
				...data,
				slug: data.title ? slugify(data.title) : existing.slug,
			};
			dispatch({ type: "UPDATE_JOB", payload: updated });
			return updated;
		},
		[state.jobs, dispatch],
	);

	const deleteJob = useCallback(
		(id: string) => dispatch({ type: "DELETE_JOB", payload: id }),
		[dispatch],
	);

	const activeJobs = state.jobs.filter((j) => j.active);

	return {
		jobs: state.jobs,
		activeJobs,
		addJob,
		updateJob,
		deleteJob,
	};
}
