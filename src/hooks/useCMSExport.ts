"use client";

import { useCallback, useRef } from "react";
import { useCMS, initialState } from "@/context/CMSContext";
import type { CMSState } from "@/types";
import { downloadJSON } from "@/utils/storage";
import { storage } from "@/utils/storage";
import { STORAGE_KEYS } from "@/utils/constants";

const EXPORT_VERSION = "1.0.0";

interface ExportData {
  version: string;
  exportedAt: string;
  data: CMSState;
}

export function useCMSExport() {
  const { state, dispatch, resetAll } = useCMS();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * Export the entire CMS state as a JSON file download.
   */
  const exportData = useCallback(() => {
    const payload: ExportData = {
      version: EXPORT_VERSION,
      exportedAt: new Date().toISOString(),
      data: state,
    };
    const filename = `estatehub-backup-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    downloadJSON(payload, filename);
  }, [state]);

  /**
   * Import CMS state from a JSON file.
   * Validates structure before applying.
   */
  const importData = useCallback(
    (file: File): Promise<{ success: boolean; error?: string }> => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const parsed = JSON.parse(e.target?.result as string) as ExportData;

            // Validate structure
            if (!parsed.data || typeof parsed.data !== "object") {
              resolve({
                success: false,
                error: "Invalid file structure: missing 'data' field.",
              });
              return;
            }

            // Check required fields
            const requiredFields: (keyof CMSState)[] = [
              "siteSettings",
              "menu",
              "properties",
              "team",
              "blog",
              "pages",
              "theme",
              "media",
              "leads",
              "seo",
            ];
            const missing = requiredFields.filter(
              (field) => !(field in parsed.data),
            );
            if (missing.length > 0) {
              resolve({
                success: false,
                error: `Invalid file structure. Missing fields: ${missing.join(", ")}`,
              });
              return;
            }

            // Apply
            dispatch({ type: "SET_STATE", payload: parsed.data });
            resolve({ success: true });
          } catch (error) {
            resolve({
              success: false,
              error: `Failed to parse JSON: ${
                error instanceof Error ? error.message : "Unknown error"
              }`,
            });
          }
        };
        reader.onerror = () => {
          resolve({ success: false, error: "Failed to read file." });
        };
        reader.readAsText(file);
      });
    },
    [dispatch],
  );

  /**
   * Trigger the file picker for import.
   */
  const triggerImport = useCallback(() => {
    if (!fileInputRef.current) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "application/json,.json";
      input.style.display = "none";
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;
        const result = await importData(file);
        if (result.success) {
          alert("✅ Data imported successfully!");
        } else {
          alert(`❌ Import failed: ${result.error}`);
        }
        // Clean up
        if (fileInputRef.current && fileInputRef.current.parentElement) {
          fileInputRef.current.parentElement.removeChild(fileInputRef.current);
        }
        fileInputRef.current = null;
      };
      document.body.appendChild(input);
      fileInputRef.current = input;
      input.click();
    } else {
      fileInputRef.current.click();
    }
  }, [importData]);

  /**
   * Reset CMS to initial state (clears localStorage).
   */
  const resetToDefaults = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      !window.confirm(
        "⚠️ This will erase ALL your custom content and restore defaults. This cannot be undone.\n\nConsider exporting a backup first.\n\nContinue?",
      )
    ) {
      return;
    }
    resetAll();
  }, [resetAll]);

  /**
   * Clear just localStorage (state remains in memory until refresh).
   */
  const clearStorage = useCallback(() => {
    storage.remove(STORAGE_KEYS.CMS_DATA);
  }, []);

  return {
    exportData,
    importData,
    triggerImport,
    resetToDefaults,
    clearStorage,
  };
}
