"use client";
import React, { useState } from "react";
import { MoreVertical, Heart, Shirt, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { NAVBAR_COLORS } from "@/components/navbar/navbar.constants";
import { OutfitsTableRowProps } from "@/modules/dashboard/outfits/types/outfits.types";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteOutfitAction } from "@/modules/dashboard/outfits/outfits.actions";
import { toast } from "sonner";

const OutfitThumbnail = () => (
  <div
    className="w-10 h-10 rounded-xl flex items-center justify-center"
    style={{
      background: NAVBAR_COLORS.primary,
      opacity: 0.9,
    }}
  >
    <Shirt className="w-5 h-5 text-white" />
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const isApproved = status === "Approved";
  return (
    <Badge
      variant={isApproved ? "success" : "warning"}
      className="px-3 py-1 text-xs font-semibold tracking-wide border"
    >
      {status}
    </Badge>
  );
};

export const OutfitsTableRow = ({ outfit }: OutfitsTableRowProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    const result = await deleteOutfitAction(outfit.outfitId);
    setIsLoading(false);

    if (result.success) {
      toast.success("Outfit deleted successfully");
      setDeleteDialogOpen(false);
    } else {
      toast.error(result.error || "Failed to delete outfit");
    }
  };

  return (
    <>
      <motion.tr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="group hover:bg-stone-50/60 dark:hover:bg-stone-900/20 transition-colors duration-200"
      >
        <td className="py-4 px-6">
          <div className="flex items-center gap-4">
            <OutfitThumbnail />
            <span className="font-bold text-gray-900 dark:text-gray-100">{outfit.name}</span>
          </div>
        </td>
        <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400 font-medium">
          {outfit.creator}
        </td>
        <td className="py-4 px-6">
          <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 font-semibold">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
            {outfit.likes}
          </div>
        </td>
        <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400">{outfit.date}</td>
        <td className="py-4 px-6">
          <StatusBadge status={outfit.status} />
        </td>
        <td className="py-4 px-6 text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={() => setDeleteDialogOpen(true)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Outfit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </td>
      </motion.tr>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Outfit</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{outfit.name}&quot;? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
