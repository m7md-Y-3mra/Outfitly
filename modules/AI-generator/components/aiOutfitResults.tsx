"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { IGeneratedOutfit } from "./aiGenerator";

type IProps = {
  showResults: boolean;
  isGenerating: boolean;
  generatedOutfits: IGeneratedOutfit[];
  onSelectOutfit: (name: string) => void;
  title?: string;
};

export function AIOutfitResults({
  showResults,
  isGenerating,
  generatedOutfits,
  onSelectOutfit,
  title = "AI Matched Outfits",
}: IProps) {
  const outfitlyGradient =
    "linear-gradient(135deg, var(--outfitly-gradient-start) 0%, var(--outfitly-gradient-mid) 50%, var(--outfitly-gradient-end) 100%)";

  return (
    <AnimatePresence>
      {showResults && !isGenerating && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12 bg-clip-text text-transparent"
            style={{
              fontSize: "2.5rem",
              fontWeight: 900,
              letterSpacing: "0.02em",
              backgroundImage: outfitlyGradient,
            }}
          >
            {title}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {generatedOutfits.map((outfit, i) => (
              <motion.div
                key={outfit.name + i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <motion.div
                  onClick={() => onSelectOutfit(outfit.name)}
                  className="group cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-300 hover:shadow-2xl relative"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--card)",
                    boxShadow: "0 10px 30px var(--outfitly-shadow)",
                  }}
                  whileHover={{
                    y: -8,
                    rotateX: 2,
                    borderColor: "var(--outfitly-primary)",
                  }}
                >
                  {/* Glow effect on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--outfitly-primary) 20%, transparent), transparent 70%)",
                    }}
                  />

                  {/* Image */}
                  <div className="relative h-64 w-full overflow-hidden">
                    {outfit.image ? (
                      <Image
                        src={outfit.image}
                        alt={outfit.name}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        priority={i < 3}
                      />
                    ) : (
                      <div
                        className="h-full w-full flex items-center justify-center text-sm"
                        style={{
                          backgroundColor: "var(--secondary)",
                          color: "var(--muted-foreground)",
                        }}
                      >
                        No image
                      </div>
                    )}

                    {/* Confidence badge (top-right) */}
                    <div className="absolute top-3 right-3 z-20">
                      <div
                        className="px-3 py-1 rounded-full text-sm shadow-lg backdrop-blur-sm relative overflow-hidden border"
                        style={{
                          backgroundColor:
                            "color-mix(in srgb, var(--outfitly-primary) 88%, transparent)",
                          color: "var(--outfitly-text-light)",
                          borderColor: "var(--outfitly-border-medium)",
                        }}
                      >
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(90deg, transparent, rgba(255,255,255,0.30), transparent)",
                          }}
                          animate={{ x: ["-100%", "200%"] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                        />
                        <span className="relative z-10">{outfit.confidence}% Match</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 relative z-10">
                    <h3 className="text-lg" style={{ color: "var(--outfitly-text-secondary)" }}>
                      {outfit.name}
                    </h3>

                    {outfit.description ? (
                      <p
                        className="text-sm opacity-70 mt-1"
                        style={{ color: "var(--outfitly-text-primary)" }}
                      >
                        {outfit.description}
                      </p>
                    ) : null}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
