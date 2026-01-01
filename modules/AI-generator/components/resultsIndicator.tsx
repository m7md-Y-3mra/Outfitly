"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

type Props = {
  show: boolean;
  onClick: () => void;
  label?: string;
};

export function ResultsReadyIndicator({
  show,
  onClick,
  label = "✨ Your Outfits Are Ready!",
}: Props) {
  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="flex justify-center mt-8"
        >
          <motion.button
            type="button"
            onClick={onClick}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <div
              className="text-center px-6 py-2 rounded-full backdrop-blur-md shadow-lg border relative overflow-hidden"
              style={{
                backgroundColor: "color-mix(in srgb, var(--outfitly-primary) 92%, transparent)",
                borderColor: "var(--outfitly-border-light, var(--border))",
                color: "var(--outfitly-text-light, #fff)",
              }}
            >
              {/* shimmer */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <span className="relative z-10 text-sm">{label}</span>
            </div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <ChevronDown
                className="w-8 h-8"
                style={{
                  color: "var(--outfitly-primary)",
                  filter:
                    "drop-shadow(0 2px 8px color-mix(in srgb, var(--outfitly-primary) 35%, transparent))",
                }}
              />

              <motion.div
                className="absolute inset-0 -z-10 blur-lg"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in srgb, var(--outfitly-primary) 65%, transparent) 0%, transparent 70%)",
                }}
                animate={{ opacity: [0.25, 0.7, 0.25], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
