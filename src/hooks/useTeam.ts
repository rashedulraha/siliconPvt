"use client";

import { useCallback } from "react";
import { useCMS } from "@/context/CMSContext";
import type { TeamMember } from "@/types";
import { generateId } from "@/lib/utils";

export function useTeam() {
	const { state, dispatch } = useCMS();

	const addMember = useCallback(
		(data: Omit<TeamMember, "id">) => {
			const member: TeamMember = {
				...data,
				id: generateId(),
			};
			dispatch({ type: "ADD_TEAM_MEMBER", payload: member });
			return member;
		},
		[dispatch],
	);

	const updateMember = useCallback(
		(id: string, data: Partial<TeamMember>) => {
			const existing = state.team.find((t) => t.id === id);
			if (!existing) return null;
			const updated: TeamMember = { ...existing, ...data };
			dispatch({ type: "UPDATE_TEAM_MEMBER", payload: updated });
			return updated;
		},
		[state.team, dispatch],
	);

	const deleteMember = useCallback(
		(id: string) => {
			dispatch({ type: "DELETE_TEAM_MEMBER", payload: id });
		},
		[dispatch],
	);

	const getMemberById = useCallback(
		(id: string) => state.team.find((t) => t.id === id),
		[state.team],
	);

	return {
		team: state.team,
		addMember,
		updateMember,
		deleteMember,
		getMemberById,
	};
}
