"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteWardrobeItemAction } from "@/modules/wardrobe/wardrobe.action";

interface ItemToDelete {
  id: string;
  name: string;
}

export function useDeleteWardrobeItem() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ItemToDelete | null>(null);
  const [isPending, startTransition] = useTransition();

  const openDeleteDialog = (item: ItemToDelete) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    if (!isPending) {
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const confirmDelete = (onDelete: (id: string) => void) => {
    if (!itemToDelete) return;

    startTransition(async () => {
      // Call the optimistic update callback immediately
      onDelete(itemToDelete.id);

      const response = await deleteWardrobeItemAction({ id: itemToDelete.id });

      if (response.success) {
        toast.success("Item deleted successfully");
        closeDeleteDialog();
      } else {
        toast.error(response.message || "Failed to delete item");
        // useOptimistic will auto-rollback on error
      }
    });
  };

  return {
    isDeleteDialogOpen,
    itemToDelete,
    isPending,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDelete,
  };
}
