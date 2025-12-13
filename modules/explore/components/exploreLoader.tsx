"use client";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export const LoadingSpinner = () => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div
          className="absolute inset-0 rounded-full border-4 border-t-transparent"
          style={{
            borderColor: "var(--outfitly-primary)",
            borderTopColor: "transparent",
          }}
        />
        <motion.div
          className="absolute inset-2 rounded-full"
          style={{
            background: `linear-gradient(135deg, var(--outfitly-gradient-start), var(--outfitly-gradient-mid), var(--outfitly-gradient-end))`,
            opacity: 0.2,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4"
      >
        <span
          className="text-lg font-medium"
          style={{
            color: theme === "dark" ? "var(--outfitly-text-light)" : "var(--outfitly-primary)",
          }}
        >
          Loading more outfits
        </span>
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            color: theme === "dark" ? "var(--outfitly-text-light)" : "var(--outfitly-primary)",
          }}
        >
          ...
        </motion.span>
      </motion.div>

      {/* Decorative Dots */}
      <div className="flex gap-2 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: "var(--outfitly-primary)",
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};
