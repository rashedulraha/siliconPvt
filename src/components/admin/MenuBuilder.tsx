"use client";

import { useState, useRef } from "react";
import { GripVertical, Pencil, Trash2, Plus, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import type { MenuItem } from "@/types";

interface MenuBuilderProps {
  items: MenuItem[];
  onReorder: (orderedIds: string[]) => void;
  onUpdate: (id: string, data: Partial<MenuItem>) => void;
  onDelete: (id: string) => void;
  onAdd: (data: Omit<MenuItem, "id" | "order">) => void;
}

export function MenuBuilder({
  items,
  onReorder,
  onUpdate,
  onDelete,
  onAdd,
}: MenuBuilderProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ label: "", href: "" });
  const [newItem, setNewItem] = useState({ label: "", href: "" });
  const dragNode = useRef<HTMLElement | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    dragNode.current = e.target as HTMLElement;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (id !== draggedId) setOverId(id);
  };

  const handleDragEnd = () => {
    if (draggedId && overId && draggedId !== overId) {
      const ids = items.map((i) => i.id);
      const fromIdx = ids.indexOf(draggedId);
      const toIdx = ids.indexOf(overId);
      const newIds = [...ids];
      newIds.splice(fromIdx, 1);
      newIds.splice(toIdx, 0, draggedId);
      onReorder(newIds);
    }
    setDraggedId(null);
    setOverId(null);
    dragNode.current = null;
  };

  const startEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setEditForm({ label: item.label, href: item.href });
  };

  const saveEdit = () => {
    if (editingId && editForm.label && editForm.href) {
      onUpdate(editingId, editForm);
      setEditingId(null);
    }
  };

  const handleAdd = () => {
    if (newItem.label && newItem.href) {
      onAdd(newItem);
      setNewItem({ label: "", href: "" });
    }
  };

  return (
    <div className="space-y-4">
      {/* Add new */}
      <Card className="p-4">
        <p className="text-sm font-medium mb-3">Add New Menu Item</p>
        <div className="flex gap-2">
          <Input
            value={newItem.label}
            onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
            placeholder="Label (e.g. Services)"
            className="flex-1"
          />
          <Input
            value={newItem.href}
            onChange={(e) => setNewItem({ ...newItem, href: e.target.value })}
            placeholder="/services"
            className="flex-1"
          />
          <Button
            onClick={handleAdd}
            disabled={!newItem.label || !newItem.href}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>
      </Card>

      {/* Items */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDragOver={(e) => handleDragOver(e, item.id)}
            onDragEnd={handleDragEnd}
            onDragLeave={() => setOverId(null)}
            className={`flex items-center gap-3 rounded-lg border bg-card p-3 transition-all ${
              draggedId === item.id ? "opacity-50" : ""
            } ${overId === item.id ? "border-primary ring-2 ring-primary/20" : ""}`}>
            <div className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground">
              <GripVertical className="h-5 w-5" />
            </div>

            {editingId === item.id ? (
              <>
                <Input
                  value={editForm.label}
                  onChange={(e) =>
                    setEditForm({ ...editForm, label: e.target.value })
                  }
                  className="flex-1"
                />
                <Input
                  value={editForm.href}
                  onChange={(e) =>
                    setEditForm({ ...editForm, href: e.target.value })
                  }
                  className="flex-1"
                />
                <Button size="icon" variant="ghost" onClick={saveEdit}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setEditingId(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.label}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {item.href}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => startEdit(item)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onDelete(item.id)}
                  className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No menu items yet. Add one above.</p>
        </div>
      )}
    </div>
  );
}
