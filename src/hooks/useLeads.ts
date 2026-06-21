"use client";

import { useCallback, useMemo } from "react";
import { useCMS } from "@/context/CMSContext";
import { generateId } from "@/lib/utils";
import { Lead } from "@/types";

export function useLeads() {
  const { state, dispatch } = useCMS();

  const addLead = useCallback(
    (data: Omit<Lead, "id" | "createdAt" | "status">) => {
      const lead: Lead = {
        ...data,
        id: generateId(),
        status: "new",
        createdAt: new Date().toISOString(),
      };
      dispatch({ type: "ADD_LEAD", payload: lead });
      return lead;
    },
    [dispatch],
  );

  const updateLeadStatus = useCallback(
    (id: string, status: Lead["status"]) => {
      dispatch({ type: "UPDATE_LEAD", payload: { id, status } });
    },
    [dispatch],
  );

  const updateLead = useCallback(
    (id: string, data: Partial<Lead>) => {
      dispatch({ type: "UPDATE_LEAD", payload: { id, ...data } });
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
