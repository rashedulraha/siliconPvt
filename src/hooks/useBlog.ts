"use client";

import { useCallback } from "react";
import { useCMS } from "@/context/CMSContext";

import { generateId, slugify } from "@/lib/utils";
import { BlogPost } from "@/types";

export function useBlog() {
	const { state, dispatch } = useCMS();

	const addPost = useCallback(
		(data: Omit<BlogPost, "id" | "slug" | "publishedAt">) => {
			const post: BlogPost = {
				...data,
				id: generateId(),
				slug: slugify(data.title),
				publishedAt: new Date().toISOString(),
			};
			dispatch({ type: "ADD_BLOG_POST", payload: post });
			return post;
		},
		[dispatch],
	);

	const updatePost = useCallback(
		(id: string, data: Partial<BlogPost>) => {
			const existing = state.blog.find((b) => b.id === id);
			if (!existing) return null;
			const updated: BlogPost = {
				...existing,
				...data,
				slug: data.title ? slugify(data.title) : existing.slug,
			};
			dispatch({ type: "UPDATE_BLOG_POST", payload: updated });
			return updated;
		},
		[state.blog, dispatch],
	);

	const deletePost = useCallback(
		(id: string) => {
			dispatch({ type: "DELETE_BLOG_POST", payload: id });
		},
		[dispatch],
	);

	const getPostBySlug = useCallback(
		(slug: string) => state.blog.find((b) => b.slug === slug),
		[state.blog],
	);

	const getFeaturedPosts = useCallback(
		(limit = 3) => state.blog.filter((b) => b.featured).slice(0, limit),
		[state.blog],
	);

	const getRecentPosts = useCallback(
		(limit = 6) =>
			[...state.blog]
				.sort(
					(a, b) =>
						new Date(b.publishedAt).getTime() -
						new Date(a.publishedAt).getTime(),
				)
				.slice(0, limit),
		[state.blog],
	);

	const getPostsByTag = useCallback(
		(tag: string) =>
			state.blog.filter((b) =>
				b.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
			),
		[state.blog],
	);

	const allTags = Array.from(new Set(state.blog.flatMap((b) => b.tags))).sort();

	return {
		posts: state.blog,
		allTags,
		addPost,
		updatePost,
		deletePost,
		getPostBySlug,
		getFeaturedPosts,
		getRecentPosts,
		getPostsByTag,
	};
}
