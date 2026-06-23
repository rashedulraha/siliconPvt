"use client";

import { useCallback } from "react";
import { useCMS } from "@/context/CMSContext";
import { generateId } from "@/lib/utils";
import { fileToDataURL, storage } from "@/utils/storage";
import { STORAGE_KEYS } from "@/utils/constants";
import { MediaItem } from "@/types";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB per file (localStorage friendly)
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function useMedia() {
  const { state, dispatch } = useCMS();

  /**
   * Upload a file. Returns the created MediaItem or null on failure.
   */
  const uploadFile = useCallback(
    async (file: File): Promise<MediaItem | null> => {
      // Validate type
      if (!ALLOWED_TYPES.includes(file.type)) {
        alert(`❌ Invalid file type. Allowed: ${ALLOWED_TYPES.join(", ")}`);
        return null;
      }
      // Validate size
      if (file.size > MAX_FILE_SIZE) {
        alert(
          `❌ File too large (${(file.size / 1024 / 1024).toFixed(
            2,
          )}MB). Max: ${MAX_FILE_SIZE / 1024 / 1024}MB per file.`,
        );
        return null;
      }
      // Check quota
      if (storage.wouldExceedQuota({ file: file.name })) {
        const proceed = confirm(
          "⚠️ Storage is getting full. This upload may exceed the safe limit. Continue?",
        );
        if (!proceed) return null;
      }

      try {
        const dataUrl = await fileToDataURL(file);
        const item: MediaItem = {
          id: generateId(),
          url: dataUrl,
          name: file.name,
          type: file.type,
          size: file.size,
          uploadedAt: new Date().toISOString(),
        };
        dispatch({ type: "ADD_MEDIA", payload: item });
        return item;
      } catch (error) {
        console.error("[useMedia] Upload failed:", error);
        alert("❌ Failed to upload file.");
        return null;
      }
    },
    [dispatch],
  );

  /**
   * Upload multiple files at once.
   */
  const uploadFiles = useCallback(
    async (files: FileList | File[]): Promise<MediaItem[]> => {
      const results: MediaItem[] = [];
      for (const file of Array.from(files)) {
        const item = await uploadFile(file);
        if (item) results.push(item);
      }
      return results;
    },
    [uploadFile],
  );

  /**
   * Upload from a URL (external image).
   */
  const uploadFromUrl = useCallback(
    (url: string, name?: string): MediaItem | null => {
      const item: MediaItem = {
        id: generateId(),
        url,
        name: name || url.split("/").pop() || "external-image",
        type: "image/url",
        size: 0,
        uploadedAt: new Date().toISOString(),
      };
      dispatch({ type: "ADD_MEDIA", payload: item });
      return item;
    },
    [dispatch],
  );

  const deleteMedia = useCallback(
    (id: string) => {
      dispatch({ type: "DELETE_MEDIA", payload: id });
    },
    [dispatch],
  );

  const getMediaById = useCallback(
    (id: string) => state.media.find((m) => m.id === id),
    [state.media],
  );

  const getStorageUsage = useCallback(() => {
    const sizeBytes = storage.estimateSize(STORAGE_KEYS.CMS_DATA);
    return {
      bytes: sizeBytes,
      kb: (sizeBytes / 1024).toFixed(2),
      mb: (sizeBytes / 1024 / 1024).toFixed(2),
    };
  }, []);

  return {
    media: state.media,
    uploadFile,
    uploadFiles,
    uploadFromUrl,
    deleteMedia,
    getMediaById,
    getStorageUsage,
  };
}
