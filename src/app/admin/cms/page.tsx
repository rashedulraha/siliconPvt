"use client";

import { useState, useEffect, useCallback } from "react";
import { Save, Settings, Menu, Image } from "lucide-react";
import { toast } from "sonner";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MenuBuilder } from "@/components/admin/MenuBuilder";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { useCMS } from "@/context/CMSContext";
import { useMenu } from "@/hooks/useMenu";
import { useMedia } from "@/hooks/useMedia";
import type { SiteSettings } from "@/types";

// ─────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────

function emptySettings(s: SiteSettings): SiteSettings {
  return { ...s };
}

// ─────────────────────────────────────────────
//  CMS Page
// ─────────────────────────────────────────────

export default function CMSPage() {
  const { state, dispatch } = useCMS();

  // ── Site Settings form state ──────────────
  const [form, setForm] = useState<SiteSettings>(() =>
    emptySettings(state.siteSettings),
  );
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Sync form when context hydrates (localStorage restore)
  useEffect(() => {
    setForm(emptySettings(state.siteSettings));
  }, [state.siteSettings]);

  // beforeunload guard
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  // ── Helpers ───────────────────────────────
  const updateField = useCallback(
    <K extends keyof Omit<SiteSettings, "social">>(
      key: K,
      value: SiteSettings[K],
    ) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      setIsDirty(true);
    },
    [],
  );

  const updateSocialField = useCallback(
    (key: keyof SiteSettings["social"], value: string) => {
      setForm((prev) => ({
        ...prev,
        social: { ...prev.social, [key]: value },
      }));
      setIsDirty(true);
    },
    [],
  );

  // ── Save ──────────────────────────────────
  const handleSave = async () => {
    setIsSaving(true);
    try {
      dispatch({ type: "UPDATE_SITE_SETTINGS", payload: form });
      setIsDirty(false);
      toast.success("Settings saved.");
    } catch {
      toast.error("Failed to save settings.");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Menu tab wiring ───────────────────────
  const { menu, addMenuItem, updateMenuItem, deleteMenuItem, reorderMenu } =
    useMenu();

  // ── Media tab wiring ──────────────────────
  const { uploadFiles, uploadFromUrl } = useMedia();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (files: FileList) => {
    setIsUploading(true);
    await uploadFiles(files);
    setIsUploading(false);
  };

  // ─────────────────────────────────────────
  //  Render
  // ─────────────────────────────────────────

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">CMS Dashboard</h1>
        <p className="text-muted-foreground">
          Edit site content, navigation, and media without touching code.
        </p>
      </div>

      <Tabs defaultValue="site-settings">
        <TabsList>
          <TabsTrigger value="site-settings">
            <Settings className="h-4 w-4 mr-1.5" />
            Site Settings
          </TabsTrigger>
          <TabsTrigger value="menu">
            <Menu className="h-4 w-4 mr-1.5" />
            Menu
          </TabsTrigger>
          <TabsTrigger value="media">
            <Image className="h-4 w-4 mr-1.5" />
            Media
          </TabsTrigger>
        </TabsList>

        {/* ──────────────── Site Settings ──────────────── */}
        <TabsContent value="site-settings" className="space-y-6 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>
                Basic details about your business that appear site-wide.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={form.siteName}
                  onChange={(e) => updateField("siteName", e.target.value)}
                  placeholder="Silicon Real Estate (Pvt.) Ltd."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  value={form.contactPhone}
                  onChange={(e) =>
                    updateField("contactPhone", e.target.value)
                  }
                  placeholder="+880 1234 567890"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  placeholder="House 12, Road 4, Gulshan-1, Dhaka 1212"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={form.contactEmail}
                  onChange={(e) =>
                    updateField("contactEmail", e.target.value)
                  }
                  placeholder="info@siliconrealestate.com.bd"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessHours">Business Hours</Label>
                <Input
                  id="businessHours"
                  value={form.businessHours ?? ""}
                  onChange={(e) =>
                    updateField("businessHours", e.target.value)
                  }
                  placeholder="Sun – Thu: 9 AM – 6 PM"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>
                Full URLs to your social media profiles.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="social-facebook">Facebook</Label>
                <Input
                  id="social-facebook"
                  value={form.social.facebook}
                  onChange={(e) =>
                    updateSocialField("facebook", e.target.value)
                  }
                  placeholder="https://facebook.com/yourpage"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social-instagram">Instagram</Label>
                <Input
                  id="social-instagram"
                  value={form.social.instagram}
                  onChange={(e) =>
                    updateSocialField("instagram", e.target.value)
                  }
                  placeholder="https://instagram.com/yourhandle"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social-linkedin">LinkedIn</Label>
                <Input
                  id="social-linkedin"
                  value={form.social.linkedin}
                  onChange={(e) =>
                    updateSocialField("linkedin", e.target.value)
                  }
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social-youtube">YouTube</Label>
                <Input
                  id="social-youtube"
                  value={form.social.youtube}
                  onChange={(e) =>
                    updateSocialField("youtube", e.target.value)
                  }
                  placeholder="https://youtube.com/@yourchannel"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-3 sticky bottom-4">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              size="lg"
              className="min-w-[140px]">
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving…" : "Save Settings"}
            </Button>
            {isDirty && (
              <p className="text-sm text-muted-foreground">
                You have unsaved changes.
              </p>
            )}
          </div>
        </TabsContent>

        {/* ──────────────── Menu ──────────────── */}
        <TabsContent value="menu" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Navigation Menu</CardTitle>
              <CardDescription>
                Drag items to reorder, click edit to rename, or add new links.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MenuBuilder
                items={menu}
                onReorder={reorderMenu}
                onUpdate={updateMenuItem}
                onDelete={deleteMenuItem}
                onAdd={addMenuItem}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ──────────────── Media ──────────────── */}
        <TabsContent value="media" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Media Library</CardTitle>
              <CardDescription>
                Upload images or add external URLs. Files are stored in browser
                localStorage.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MediaUploader
                onFileUpload={handleFileUpload}
                onUrlAdd={uploadFromUrl}
                isUploading={isUploading}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
