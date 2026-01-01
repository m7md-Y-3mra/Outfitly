"use client";
import { useOptimistic } from "react";
import { GetUserWardrobeItemResponse } from "@/modules/wardrobe/types/dto.types";
import { useViewMode } from "../../provider/viewMode.provider";
import { motion } from "framer-motion";
import { AddNewGridCard } from "./addNewGridCard";
import { WardrobeGridItem } from "./wardrobeGridItem";
import { AddNewListCard } from "./addNewListCard";
import { WardrobeListItem } from "./wardrobeListItem";

export function WardrobeCards({
  wardrobeItems,
}: {
  wardrobeItems: GetUserWardrobeItemResponse["items"];
}) {
  const { viewMode } = useViewMode();

  // Optimistic state for delete operations
  const [optimisticItems, deleteOptimisticItem] = useOptimistic(
    wardrobeItems,
    (state, deletedItemId: string) => {
      return state.filter((item) => item.id !== deletedItemId);
    },
  );

  const handleDeleteItem = (itemId: string) => {
    deleteOptimisticItem(itemId);
  };

  const items = optimisticItems || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  if (viewMode === "grid") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {/* Add New Item Card */}
        <AddNewGridCard />

        {/* Wardrobe Items */}
        {items.map((item, index) => (
          <WardrobeGridItem key={item.id} item={item} index={index} onDelete={handleDeleteItem} />
        ))}
      </motion.div>
    );
  }

  // List View (Default if not 'grid')
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-8 space-y-4"
    >
      {/* Add New Item - List View */}
      <AddNewListCard />

      {/* Items List */}
      {items.map((item, index) => (
        <WardrobeListItem key={item.id} item={item} index={index} onDelete={handleDeleteItem} />
      ))}
    </motion.div>
  );
}
