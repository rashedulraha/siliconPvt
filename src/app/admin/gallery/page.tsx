"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Loader2,
  RefreshCw,
  Lock,
  AlertTriangle,
  CheckCircle2,
  X,
  Image as ImageIcon,
  MapPin,
  Eye,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { apiFetch } from "@/lib/api-client";
import { useAdminEditor } from "@/context/AdminEditorContext";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  location: string;
  overview: string;
  images: string[];
  features: string[];
  order: number;
  active: boolean;
}

const CATEGORY_OPTIONS = [
  { value: "project", label: "Silicon City Project" },
  { value: "infrastructure", label: "Infrastructure & Amenities" },
  { value: "office", label: "Corporate Office" },
  { value: "handovers", label: "Client Handovers" },
];

const emptyForm = {
  title: "",
  category: "project",
  badge: "",
  location: "",
  overview: "",
  images: [""],
  features: [""],
  order: 0,
  active: true,
};

type ConfirmAction =
  | { type: "delete"; item: GalleryItem }
  | { type: "save"; item: GalleryItem | null; form: typeof emptyForm }
  | null;

export default function AdminGalleryPage() {
  const { isEditorUnlocked, unlockEditorMode } = useAdminEditor();

  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Edit/Create Modal state
  const [editModal, setEditModal] = useState<{ open: boolean; item: GalleryItem | null }>({ open: false, item: null });
  const [form, setForm] = useState({ ...emptyForm });

  // Confirmation Modal state
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await apiFetch<{ success: boolean; items?: GalleryItem[] }>("/gallery");
      if (res?.success && res.items) setItems(res.items);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openCreate = () => {
    if (!isEditorUnlocked) { unlockEditorMode(); return; }
    setForm({ ...emptyForm });
    setEditModal({ open: true, item: null });
  };

  const openEdit = (item: GalleryItem) => {
    if (!isEditorUnlocked) { unlockEditorMode(); return; }
    setForm({
      title: item.title,
      category: item.category,
      badge: item.badge,
      location: item.location,
      overview: item.overview,
      images: item.images.length > 0 ? item.images : [""],
      features: item.features.length > 0 ? item.features : [""],
      order: item.order,
      active: item.active,
    });
    setEditModal({ open: true, item });
  };

  const handleRequestSave = () => {
    if (!isEditorUnlocked) { unlockEditorMode(); return; }
    setConfirmAction({ type: "save", item: editModal.item, form });
  };

  const handleRequestDelete = (item: GalleryItem) => {
    if (!isEditorUnlocked) { unlockEditorMode(); return; }
    setConfirmAction({ type: "delete", item });
  };

  const handleConfirm = async () => {
    if (!confirmAction) return;
    setSaving(true);

    try {
      if (confirmAction.type === "delete") {
        await apiFetch(`/gallery/${confirmAction.item.id}`, { method: "DELETE" });
        setItems((prev) => prev.filter((i) => i.id !== confirmAction.item.id));
        showSuccess("Gallery item deleted successfully!");
      } else if (confirmAction.type === "save") {
        const payload = {
          ...confirmAction.form,
          images: confirmAction.form.images.filter((u) => u.trim() !== ""),
          features: confirmAction.form.features.filter((f) => f.trim() !== ""),
        };

        if (confirmAction.item) {
          const res = await apiFetch<{ success: boolean; item?: GalleryItem }>(`/gallery/${confirmAction.item.id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
          });
          if (res?.success && res.item) {
            setItems((prev) => prev.map((i) => i.id === res.item!.id ? res.item! : i));
            showSuccess("Gallery item updated successfully!");
          }
        } else {
          const res = await apiFetch<{ success: boolean; item?: GalleryItem }>("/gallery", {
            method: "POST",
            body: JSON.stringify(payload),
          });
          if (res?.success && res.item) {
            setItems((prev) => [...prev, res.item!]);
            showSuccess("Gallery item created successfully!");
          }
        }
        setEditModal({ open: false, item: null });
      }
    } finally {
      setSaving(false);
      setConfirmAction(null);
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const setImageUrl = (idx: number, val: string) => {
    setForm((prev) => {
      const images = [...prev.images];
      images[idx] = val;
      return { ...prev, images };
    });
  };

  const addImageField = () => setForm((prev) => ({ ...prev, images: [...prev.images, ""] }));
  const removeImageField = (idx: number) => setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));

  const setFeature = (idx: number, val: string) => {
    setForm((prev) => {
      const features = [...prev.features];
      features[idx] = val;
      return { ...prev, features };
    });
  };
  const addFeature = () => setForm((prev) => ({ ...prev, features: [...prev.features, ""] }));
  const removeFeature = (idx: number) => setForm((prev) => ({ ...prev, features: prev.features.filter((_, i) => i !== idx) }));

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-foreground">Gallery Manager</h1>
            <p className="text-xs text-muted-foreground font-light mt-0.5">
              {items.length} items in gallery • Manage project photos, infrastructure, and handover albums
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchItems}
              className="h-9 px-3.5 rounded-xl bg-card border border-border/80 text-foreground text-xs font-medium inline-flex items-center gap-1.5 hover:bg-muted transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <button
              onClick={openCreate}
              className="h-9 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all cursor-pointer hover:bg-primary/90"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Gallery Item
            </button>
          </div>
        </div>

        {/* Lock Banner */}
        {!isEditorUnlocked && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-medium flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 shrink-0" />
              <span><strong>Read-Only Mode:</strong> Unlock Editor Mode to add, edit, or delete gallery items.</span>
            </div>
            <button
              onClick={unlockEditorMode}
              className="px-3 py-1.5 rounded-lg bg-amber-500 text-black text-[11px] font-bold uppercase tracking-wider hover:bg-amber-400 shrink-0 cursor-pointer"
            >
              Unlock
            </button>
          </div>
        )}

        {/* Success Toast */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              {successMsg}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-3xl bg-muted/60 animate-pulse aspect-[4/3]" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground text-sm">No gallery items yet. Add your first one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="group bg-card border border-border/70 rounded-[24px] overflow-hidden flex flex-col hover:border-border transition-all">
                {/* Cover Image */}
                <div className="relative aspect-[16/10] bg-muted overflow-hidden">
                  {item.images[0] ? (
                    <Image src={item.images[0]} alt={item.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-bold font-mono uppercase tracking-widest px-2.5 py-1 bg-background/90 backdrop-blur text-primary rounded-full border border-border/40">
                      {item.badge}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${item.active ? "bg-emerald-500/20 text-emerald-500 border border-emerald-500/20" : "bg-muted text-muted-foreground border border-border/40"}`}>
                      {item.active ? "ACTIVE" : "HIDDEN"}
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span className="line-clamp-1">{item.location}</span>
                    </div>
                    <h3 className="text-sm font-bold font-heading text-foreground line-clamp-2">{item.title}</h3>
                    <p className="text-xs text-muted-foreground font-light line-clamp-2">{item.overview}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <span className="text-[11px] text-muted-foreground font-mono">
                      {item.images.length} img • {item.features.length} feat
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/gallery/${item.id}`}
                        target="_blank"
                        className="p-1.5 rounded-lg bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer"
                        title="View public page"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => openEdit(item)}
                        className="p-1.5 rounded-lg bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer"
                        title="Edit"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleRequestDelete(item)}
                        className="p-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── EDIT / CREATE MODAL ── */}
      <AnimatePresence>
        {editModal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setEditModal({ open: false, item: null })}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="bg-card border border-border/80 rounded-[28px] max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-card border-b border-border/50 px-6 py-4 flex items-center justify-between rounded-t-[28px]">
                <div>
                  <h3 className="text-base font-bold font-heading text-foreground">
                    {editModal.item ? "Edit Gallery Item" : "Add New Gallery Item"}
                  </h3>
                  <p className="text-xs text-muted-foreground font-light">
                    {editModal.item ? `Editing: ${editModal.item.title}` : "Create a new gallery entry"}
                  </p>
                </div>
                <button
                  onClick={() => setEditModal({ open: false, item: null })}
                  className="p-2 rounded-xl bg-muted hover:bg-muted/80 text-muted-foreground transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                    placeholder="e.g. Aerial View of Silicon City Layout"
                    className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Category & Badge */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Category *</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
                      className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
                    >
                      {CATEGORY_OPTIONS.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Badge Label *</label>
                    <input
                      type="text"
                      value={form.badge}
                      onChange={(e) => setForm((p) => ({ ...p, badge: e.target.value }))}
                      placeholder="e.g. SILICON CITY PROJECT"
                      className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Location *</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                    placeholder="e.g. Bara Badeshi Mouza, Savar"
                    className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Overview */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Overview / Description *</label>
                  <textarea
                    rows={3}
                    value={form.overview}
                    onChange={(e) => setForm((p) => ({ ...p, overview: e.target.value }))}
                    placeholder="Describe what this gallery section showcases..."
                    className="w-full px-3 py-2.5 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                {/* Image URLs */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-foreground">Image URLs</label>
                    <button onClick={addImageField} className="text-xs text-primary font-bold hover:underline cursor-pointer">+ Add Image</button>
                  </div>
                  <div className="space-y-2">
                    {form.images.map((img, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="url"
                          value={img}
                          onChange={(e) => setImageUrl(idx, e.target.value)}
                          placeholder={`https://... (Image ${idx + 1})`}
                          className="flex-1 h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
                        />
                        {form.images.length > 1 && (
                          <button onClick={() => removeImageField(idx)} className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center cursor-pointer hover:bg-destructive/20">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-foreground">Features / Highlights</label>
                    <button onClick={addFeature} className="text-xs text-primary font-bold hover:underline cursor-pointer">+ Add Feature</button>
                  </div>
                  <div className="space-y-2">
                    {form.features.map((feat, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={feat}
                          onChange={(e) => setFeature(idx, e.target.value)}
                          placeholder="e.g. 40ft Wide Concrete Roads"
                          className="flex-1 h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
                        />
                        {form.features.length > 1 && (
                          <button onClick={() => removeFeature(idx)} className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center cursor-pointer hover:bg-destructive/20">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order & Active */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Sort Order</label>
                    <input
                      type="number"
                      value={form.order}
                      onChange={(e) => setForm((p) => ({ ...p, order: Number(e.target.value) }))}
                      className="w-full h-10 px-3 rounded-xl bg-background border border-border/80 text-xs text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Status</label>
                    <div className="flex items-center gap-3 h-10">
                      <button
                        onClick={() => setForm((p) => ({ ...p, active: true }))}
                        className={`flex-1 h-full rounded-xl text-xs font-bold border transition-all cursor-pointer ${form.active ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border/60"}`}
                      >
                        Active
                      </button>
                      <button
                        onClick={() => setForm((p) => ({ ...p, active: false }))}
                        className={`flex-1 h-full rounded-xl text-xs font-bold border transition-all cursor-pointer ${!form.active ? "bg-muted text-foreground border-border" : "bg-card text-muted-foreground border-border/60"}`}
                      >
                        Hidden
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-border/50">
                  <button
                    onClick={() => setEditModal({ open: false, item: null })}
                    className="px-4 py-2.5 rounded-xl bg-muted text-foreground text-xs font-medium cursor-pointer hover:bg-muted/80 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRequestSave}
                    className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-primary/90 transition-all"
                  >
                    {editModal.item ? "Save Changes" : "Create Item"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CONFIRMATION MODAL ── */}
      <AnimatePresence>
        {confirmAction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => !saving && setConfirmAction(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border/80 rounded-[24px] max-w-md w-full p-6 space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  confirmAction.type === "delete" ? "bg-destructive/10" : "bg-primary/10"
                }`}>
                  {confirmAction.type === "delete"
                    ? <AlertTriangle className="w-5 h-5 text-destructive" />
                    : <CheckCircle2 className="w-5 h-5 text-primary" />
                  }
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold font-heading text-foreground">
                    {confirmAction.type === "delete" ? "Confirm Delete" : "Confirm Save"}
                  </h4>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">
                    {confirmAction.type === "delete"
                      ? `Are you sure you want to permanently delete "${confirmAction.item.title}"? This action cannot be undone.`
                      : `Are you sure you want to ${confirmAction.item ? "update" : "create"} "${confirmAction.form.title}"? This will be saved to the database.`
                    }
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-1">
                <button
                  onClick={() => setConfirmAction(null)}
                  disabled={saving}
                  className="px-4 py-2.5 rounded-xl bg-muted text-foreground text-xs font-medium cursor-pointer hover:bg-muted/80 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={saving}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer inline-flex items-center gap-2 disabled:opacity-60 transition-all ${
                    confirmAction.type === "delete"
                      ? "bg-destructive text-white hover:bg-destructive/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {confirmAction.type === "delete" ? "Yes, Delete" : `Yes, ${confirmAction.item ? "Update" : "Create"}`}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
