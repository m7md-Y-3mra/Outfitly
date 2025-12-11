"use client";
import { motion } from "framer-motion";
import { RefObject } from "react";
import { LoadingSpinner } from "./exploreLoader";
interface IProps {
  loading: boolean;
  hasMore: boolean;
  loaderRef: RefObject<HTMLDivElement | null>;
}
const InfinteScroll = ({ loading, hasMore, loaderRef }: IProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-12 flex justify-center"
    >
      {hasMore && (
        <div ref={loaderRef}>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl"
              style={{
                backgroundColor: "var(--outfitly-primary)",
                color: "var(--outfitly-text-light)",
              }}
            >
              <span className="text-lg">Load More</span>
            </motion.button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default InfinteScroll;
