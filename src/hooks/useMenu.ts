"use client";

import { useCallback } from "react";
import { useCMS } from "@/context/CMSContext";
import { MenuItem } from "@/types";
// import type { MenuItem } from "@/types";
import { generateId } from "@/lib/utils";

export function useMenu() {
  const { state, dispatch } = useCMS();

  const addMenuItem = useCallback(
    (data: Omit<MenuItem, "id" | "order">) => {
      const maxOrder = state.menu.reduce(
        (max, item) => Math.max(max, item.order),
        0,
      );
      const item: MenuItem = {
        ...data,
        id: generateId(),
        order: maxOrder + 1,
      };
      dispatch({ type: "ADD_MENU_ITEM", payload: item });
      return item;
    },
    [state.menu, dispatch],
  );

  const updateMenuItem = useCallback(
    (id: string, data: Partial<MenuItem>) => {
      const existing = state.menu.find((m) => m.id === id);
      if (!existing) return;
      dispatch({
        type: "UPDATE_MENU_ITEM",
        payload: { ...existing, ...data },
      });
    },
    [state.menu, dispatch],
  );

  const deleteMenuItem = useCallback(
    (id: string) => {
      dispatch({ type: "DELETE_MENU_ITEM", payload: id });
    },
    [dispatch],
  );

  /**
   * Reorder menu items. Accepts an array of IDs in the new order.
   */
  const reorderMenu = useCallback(
    (orderedIds: string[]) => {
      const reordered: MenuItem[] = orderedIds
        .map((id, index) => {
          const item = state.menu.find((m) => m.id === id);
          return item ? { ...item, order: index + 1 } : null;
        })
        .filter((m): m is MenuItem => m !== null);
      dispatch({ type: "REORDER_MENU", payload: reordered });
    },
    [state.menu, dispatch],
  );

  /**
   * Move an item up or down by swapping with its neighbor.
   */
  const moveMenuItem = useCallback(
    (id: string, direction: "up" | "down") => {
      const sorted = [...state.menu].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex((m) => m.id === id);
      if (index === -1) return;
      if (direction === "up" && index === 0) return;
      if (direction === "down" && index === sorted.length - 1) return;

      const swapIndex = direction === "up" ? index - 1 : index + 1;
      const newOrder = [...sorted];
      [newOrder[index], newOrder[swapIndex]] = [
        newOrder[swapIndex],
        newOrder[index],
      ];
      reorderMenu(newOrder.map((m) => m.id));
    },
    [state.menu, reorderMenu],
  );

  const sortedMenu = [...state.menu].sort((a, b) => a.order - b.order);

  return {
    menu: sortedMenu,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    reorderMenu,
    moveMenuItem,
  };
}
