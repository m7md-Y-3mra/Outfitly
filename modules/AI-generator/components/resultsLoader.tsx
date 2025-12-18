"use client";

import { motion, AnimatePresence } from "framer-motion";

type Props = {
  show: boolean;
  title?: string;
  subtitle?: string;
};

export function AIGeneratorLoading({
  show,
  title = "Generating outfits...",
  subtitle = "Analyzing your wardrobe and matching the best combinations",
}: Props) {
  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.35 }}
          className="mt-10"
        >
          <div
            className="rounded-2xl border overflow-hidden"
            style={{
              borderColor: "var(--outfitly-border-light, var(--border))",
              backgroundColor: "color-mix(in srgb, var(--card) 85%, transparent)",
            }}
          >
            <motion.div
              className="h-1 w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, color-mix(in srgb, var(--outfitly-primary) 55%, transparent), transparent)",
              }}
              animate={{ x: ["-40%", "40%", "-40%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="p-6">
              <div className="flex items-center gap-3">
                {/* spinner */}
                <motion.div
                  className="h-9 w-9 rounded-full border-2"
                  style={{
                    borderColor: "color-mix(in srgb, var(--outfitly-primary) 25%, transparent)",
                    borderTopColor: "var(--outfitly-primary)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                />
                <div className="flex-1">
                  <p
                    className="font-semibold"
                    style={{ color: "var(--outfitly-text-primary, var(--foreground))" }}
                  >
                    {title}
                  </p>
                  <p
                    className="text-sm opacity-70"
                    style={{ color: "var(--outfitly-text-primary, var(--foreground))" }}
                  >
                    {subtitle}
                  </p>
                </div>
              </div>

              {/* skeleton cards */}
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl border overflow-hidden"
                    style={{
                      borderColor: "var(--outfitly-border-light, var(--border))",
                      backgroundColor: "var(--outfitly-bg-secondary, var(--card))",
                    }}
                  >
                    <div
                      className="h-40 w-full"
                      style={{ backgroundColor: "var(--outfitly-bg-tertiary, var(--secondary))" }}
                    />
                    <div className="p-4 space-y-2">
                      <div
                        className="h-4 w-3/4 rounded"
                        style={{ backgroundColor: "var(--outfitly-bg-tertiary, var(--secondary))" }}
                      />
                      <div
                        className="h-3 w-full rounded"
                        style={{ backgroundColor: "var(--outfitly-bg-tertiary, var(--secondary))" }}
                      />
                      <div
                        className="h-3 w-5/6 rounded"
                        style={{ backgroundColor: "var(--outfitly-bg-tertiary, var(--secondary))" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
