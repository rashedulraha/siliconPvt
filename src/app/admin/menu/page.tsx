"use client";

import { useState } from "react";
import { Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { MenuBuilder } from "@/components/admin/MenuBuilder";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useMenu } from "@/hooks/useMenu";
import { useCMS } from "@/context/CMSContext";
import { initialState } from "@/context/CMSContext";

export default function MenuPage() {
  const { menu, addMenuItem, updateMenuItem, deleteMenuItem, reorderMenu } =
    useMenu();
  const { dispatch } = useCMS();
  const [resetOpen, setResetOpen] = useState(false);

  const handleReset = () => {
    dispatch({ type: "REORDER_MENU", payload: initialState.menu });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle>Navigation Menu</CardTitle>
              <CardDescription>
                Drag items to reorder, click edit to modify, or add new items
                below.
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setResetOpen(true)}>
              <RotateCcw className="h-4 w-4 mr-1" /> Reset to Default
            </Button>
          </div>
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

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            How your menu appears on the public site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border bg-muted/40 p-4">
            <nav className="flex flex-wrap gap-4">
              {menu.map((item) => (
                <span key={item.id} className="text-sm font-medium">
                  {item.label}
                </span>
              ))}
            </nav>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={resetOpen}
        onOpenChange={setResetOpen}
        title="Reset Menu"
        description="This will restore the default menu items. Your custom items will be lost."
        confirmText="Reset"
        onConfirm={handleReset}
      />
    </div>
  );
}
