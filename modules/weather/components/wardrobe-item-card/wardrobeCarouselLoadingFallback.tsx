"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const WardrobeCarouselLoadingFallback = ({ count = 6 }: { count?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex space-x-4 overflow-x-hidden pb-4"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-48 flex-shrink-0">
          <div className="rounded-xl overflow-hidden border-2 bg-[var(--card)]">
            <Skeleton className="aspect-square w-full" />
            <div className="p-3">
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default WardrobeCarouselLoadingFallback;
