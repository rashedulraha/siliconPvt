"use client";

import { useCallback, useMemo } from "react";
import { useCMS } from "@/context/CMSContext";
import type { Property } from "@/types";
import { generateId, slugify } from "@/lib/utils";

export function useProperties() {
  const { state, dispatch } = useCMS();

  const addProperty = useCallback(
    (data: Omit<Property, "id" | "slug" | "createdAt" | "updatedAt">) => {
      const now = new Date().toISOString();
      const property: Property = {
        ...data,
        id: generateId(),
        slug: slugify(data.title),
        createdAt: now,
        updatedAt: now,
      };
      dispatch({ type: "ADD_PROPERTY", payload: property });
      return property;
    },
    [dispatch],
  );

  const updateProperty = useCallback(
    (id: string, data: Partial<Property>) => {
      const existing = state.properties.find((p) => p.id === id);
      if (!existing) return null;
      const updated: Property = {
        ...existing,
        ...data,
        slug: data.title ? slugify(data.title) : existing.slug,
        updatedAt: new Date().toISOString(),
      };
      dispatch({ type: "UPDATE_PROPERTY", payload: updated });
      return updated;
    },
    [state.properties, dispatch],
  );

  const deleteProperty = useCallback(
    (id: string) => {
      dispatch({ type: "DELETE_PROPERTY", payload: id });
    },
    [dispatch],
  );

  const getPropertyById = useCallback(
    (id: string) => state.properties.find((p) => p.id === id),
    [state.properties],
  );

  const getPropertyBySlug = useCallback(
    (slug: string) => state.properties.find((p) => p.slug === slug),
    [state.properties],
  );

  const getPropertiesByType = useCallback(
    (type: "sale" | "rent") => state.properties.filter((p) => p.type === type),
    [state.properties],
  );

  const getPropertiesByCategory = useCallback(
    (category: Property["category"]) =>
      state.properties.filter((p) => p.category === category),
    [state.properties],
  );

  const getFeaturedProperties = useCallback(
    (limit = 6) =>
      state.properties.filter((p) => p.status === "available").slice(0, limit),
    [state.properties],
  );

  const searchProperties = useCallback(
    (query: string) => {
      const q = query.toLowerCase().trim();
      if (!q) return state.properties;
      return state.properties.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q),
      );
    },
    [state.properties],
  );

  const stats = useMemo(() => {
    const total = state.properties.length;
    const available = state.properties.filter(
      (p) => p.status === "available",
    ).length;
    const forSale = state.properties.filter((p) => p.type === "sale").length;
    const forRent = state.properties.filter((p) => p.type === "rent").length;
    return { total, available, forSale, forRent };
  }, [state.properties]);

  return {
    properties: state.properties,
    stats,
    addProperty,
    updateProperty,
    deleteProperty,
    getPropertyById,
    getPropertyBySlug,
    getPropertiesByType,
    getPropertiesByCategory,
    getFeaturedProperties,
    searchProperties,
  };
}
