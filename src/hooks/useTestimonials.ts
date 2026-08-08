"use client";

import { useCallback } from "react";
import { useCMS } from "@/context/CMSContext";
import type { Testimonial } from "@/types";
import { generateId } from "@/lib/utils";

export function useTestimonials() {
	const { state, dispatch } = useCMS();

	const addTestimonial = useCallback(
		(data: Omit<Testimonial, "id" | "order">) => {
			const maxOrder = state.testimonials.reduce(
				(max, t) => Math.max(max, t.order),
				0,
			);
			const testimonial: Testimonial = {
				...data,
				id: generateId(),
				order: maxOrder + 1,
			};
			dispatch({ type: "ADD_TESTIMONIAL", payload: testimonial });
			return testimonial;
		},
		[state.testimonials, dispatch],
	);

	const updateTestimonial = useCallback(
		(id: string, data: Partial<Testimonial>) => {
			const existing = state.testimonials.find((t) => t.id === id);
			if (!existing) return null;
			const updated: Testimonial = { ...existing, ...data };
			dispatch({ type: "UPDATE_TESTIMONIAL", payload: updated });
			return updated;
		},
		[state.testimonials, dispatch],
	);

	const deleteTestimonial = useCallback(
		(id: string) => dispatch({ type: "DELETE_TESTIMONIAL", payload: id }),
		[dispatch],
	);

	const sorted = [...state.testimonials].sort((a, b) => a.order - b.order);

	return {
		testimonials: sorted,
		addTestimonial,
		updateTestimonial,
		deleteTestimonial,
	};
}
