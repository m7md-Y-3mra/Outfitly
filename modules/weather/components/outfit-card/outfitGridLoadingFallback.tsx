"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const OutfitGridLoadingFallback = ({ count = 4 }: { count?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden border-2 bg-[var(--card)]">
          {/* Header */}
          <div className="p-4 border-b">
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-3 w-32" />
          </div>

          {/* Image */}
          <Skeleton className="aspect-[3/4] w-full" />

          {/* Button */}
          <div className="p-4">
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default OutfitGridLoadingFallback;
