"use client";

import { useCallback, useMemo } from "react";
import { useCMS } from "@/context/CMSContext";
import { generateId } from "@/lib/utils";
import { Lead } from "@/types";
import { apiFetch } from "@/lib/api-client";

export function useLeads() {
	const { state, dispatch } = useCMS();

	const addLead = useCallback(
		async (data: Omit<Lead, "id" | "createdAt" | "status">) => {
			const lead: Lead = {
				...data,
				id: generateId(),
				status: "new",
				createdAt: new Date().toISOString(),
			};
			dispatch({ type: "ADD_LEAD", payload: lead });

			try {
				await apiFetch("/leads", {
					method: "POST",
					body: JSON.stringify(data),
				});
			} catch (err) {
				console.error(
					"[useLeads] Failed to submit inquiry to backend DB:",
					err,
				);
			}

			return lead;
		},
		[dispatch],
	);

	const updateLeadStatus = useCallback(
		async (id: string, status: Lead["status"]) => {
			dispatch({ type: "UPDATE_LEAD", payload: { id, status } });
			try {
				await apiFetch(`/leads/${id}`, {
					method: "PUT",
					body: JSON.stringify({ status }),
				});
			} catch (err) {
				console.error(
					"[useLeads] Failed to update lead status on backend DB:",
					err,
				);
			}
		},
		[dispatch],
	);

	const updateLead = useCallback(
		async (id: string, data: Partial<Lead>) => {
			dispatch({ type: "UPDATE_LEAD", payload: { id, ...data } });
			try {
				await apiFetch(`/leads/${id}`, {
					method: "PUT",
					body: JSON.stringify(data),
				});
			} catch (err) {
				console.error("[useLeads] Failed to update lead on backend DB:", err);
			}
		},
		[dispatch],
	);

	const deleteLead = useCallback(
		(id: string) => {
			dispatch({ type: "DELETE_LEAD", payload: id });
		},
		[dispatch],
	);

	const getLeadsByStatus = useCallback(
		(status: Lead["status"]) => state.leads.filter((l) => l.status === status),
		[state.leads],
	);

	const getLeadsForProperty = useCallback(
		(propertyId: string) =>
			state.leads.filter((l) => l.propertyId === propertyId),
		[state.leads],
	);

	const stats = useMemo(() => {
		const total = state.leads.length;
		const newLeads = state.leads.filter((l) => l.status === "new").length;
		const contacted = state.leads.filter(
			(l) => l.status === "contacted",
		).length;
		const qualified = state.leads.filter(
			(l) => l.status === "qualified",
		).length;
		const closed = state.leads.filter((l) => l.status === "closed").length;
		return { total, new: newLeads, contacted, qualified, closed };
	}, [state.leads]);

	return {
		leads: state.leads,
		stats,
		addLead,
		updateLead,
		updateLeadStatus,
		deleteLead,
		getLeadsByStatus,
		getLeadsForProperty,
	};
}
