"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useViewMode } from "../../provider/viewMode.provider";

const WardrobeListLoadingFallback = ({ count = 8 }: { count?: number }) => {
  const { viewMode } = useViewMode();

  // Create an array for mapping the skeletons
  const skeletonArray = Array.from({ length: count });

  // --- Grid View Skeletons ---
  if (viewMode === "grid") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {/* Skeleton for the 'Add New' Card (Grid style) */}
        <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#2A2A30] flex items-center justify-center">
          <div className="p-6 text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-gray-300 dark:bg-gray-600/50 flex items-center justify-center">
              <Plus className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <Skeleton className="h-4 w-20 mb-2 mx-auto" />
            <Skeleton className="h-3 w-16 mx-auto" />
          </div>
        </div>

        {/* Skeletons for Wardrobe Items (Grid style) */}
        {skeletonArray.map((_, index) => (
          <div
            key={`grid-skeleton-${index}`}
            className="relative aspect-3/4 rounded-2xl overflow-hidden bg-white dark:bg-[#2A2A30] shadow-md"
          >
            {/* Image Area */}
            <Skeleton className="w-full h-full object-cover" />

            {/* Info Area (Bottom Overlay Style) */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/3 mb-4" />

              {/* Action Buttons Area */}
              <div className="flex gap-2">
                <Skeleton className="flex-1 h-8 rounded-lg" />
                <Skeleton className="w-8 h-8 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    );
  }

  // --- List View Skeletons ---
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-8 space-y-4"
    >
      {/* Skeleton for the 'Add New' Card (List style) */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-[#2A2A30] p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gray-300 dark:bg-gray-600/50 flex items-center justify-center shrink-0">
            <Plus className="w-8 h-8 text-gray-400 dark:text-gray-500" />
          </div>
          <div>
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-4 w-60" />
          </div>
        </div>
      </div>

      {/* Skeletons for Wardrobe Items (List style) */}
      {skeletonArray.map((_, index) => (
        <div
          key={`list-skeleton-${index}`}
          className="relative overflow-hidden rounded-2xl bg-white dark:bg-[#2A2A30] p-4 shadow-sm"
        >
          <div className="flex items-center gap-4">
            {/* Image Area */}
            <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
              <Skeleton className="w-full h-full" />
            </div>

            {/* Info Area */}
            <div className="flex-1 min-w-0">
              <Skeleton className="h-5 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>

            {/* Actions Area */}
            <div className="flex gap-2 shrink-0">
              <Skeleton className="w-10 h-10 rounded-xl" />
              <Skeleton className="w-10 h-10 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default WardrobeListLoadingFallback;
