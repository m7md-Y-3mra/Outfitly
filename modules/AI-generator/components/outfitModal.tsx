"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Shirt, ShoppingBag, CheckCircle2, Heart, Share2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import OutfitItemCard from "./outfitItemCard";
import type { IOutfitForModal } from "./aiGenerator";

type OutfitPreviewModalProps = {
  open: boolean;
  onClose: () => void;
  outfit: IOutfitForModal;
};

export function OutfitPreviewModal({ open, onClose, outfit }: OutfitPreviewModalProps) {
  const coverImage = outfit.items?.[0]?.images?.[0] ?? "";
  const itemsCount = outfit.items?.length ?? 0;

  // ✅ Prevent body scroll + prevent layout shift that can cause x-scroll
  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
          style={{ backgroundColor: "hsl(var(--background) / 0.75)" }}
          onClick={onClose}
        >
          {/* ✅ Center wrapper - never scrolls horizontally */}
          <div className="fixed inset-0 p-4 sm:p-6 flex items-center justify-center overflow-x-hidden">
            <motion.div
              key="panel"
              initial={{ scale: 0.96, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto overflow-x-hidden border"
              style={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
              }}
            >
              {/* Glow (clipped) */}
              <div
                className="pointer-events-none absolute -inset-1 rounded-2xl opacity-20 blur-xl"
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.7) 50%, transparent 100%)",
                }}
              />

              <div className="relative min-w-0 overflow-x-hidden">
                {/* Header */}
                <div
                  className="sticky top-0 z-10 p-6 border-b backdrop-blur-sm min-w-0"
                  style={{
                    borderColor: "hsl(var(--border))",
                    backgroundColor: "hsl(var(--card) / 0.92)",
                  }}
                >
                  <div className="flex items-start justify-between gap-4 min-w-0">
                    <div className="min-w-0">
                      <h2 className="mb-2 break-words text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--primary)/0.85)] to-[hsl(var(--primary)/0.7)] text-2xl font-black">
                        {outfit.name}
                      </h2>

                      {outfit.description ? (
                        <p
                          className="text-sm opacity-80 break-words"
                          style={{ color: "hsl(var(--muted-foreground))" }}
                        >
                          {outfit.description}
                        </p>
                      ) : null}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.08, rotate: 90 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={onClose}
                      className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border"
                      style={{
                        backgroundColor: "hsl(var(--secondary))",
                        borderColor: "hsl(var(--border))",
                      }}
                      aria-label="Close"
                    >
                      <X className="w-5 h-5" style={{ color: "hsl(var(--foreground))" }} />
                    </motion.button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-4 min-w-0">
                    {typeof outfit.confidence === "number" ? (
                      <Badge
                        className="shadow-md"
                        style={{
                          backgroundColor: "hsl(var(--primary))",
                          color: "hsl(var(--primary-foreground))",
                        }}
                      >
                        {outfit.confidence}% Match
                      </Badge>
                    ) : null}

                    <Badge
                      className="shadow-md"
                      style={{
                        backgroundColor: "hsl(var(--secondary))",
                        color: "hsl(var(--foreground))",
                        borderColor: "hsl(var(--border))",
                      }}
                    >
                      {itemsCount} Items
                    </Badge>

                    {outfit.style ? (
                      <Badge
                        className="shadow-md"
                        style={{
                          backgroundColor: "hsl(var(--secondary))",
                          color: "hsl(var(--foreground))",
                          borderColor: "hsl(var(--border))",
                        }}
                      >
                        {outfit.style}
                      </Badge>
                    ) : null}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 min-w-0 overflow-x-hidden">
                  {/* Preview */}
                  <div className="mb-8 min-w-0">
                    <div className="flex items-center gap-3 mb-4 min-w-0">
                      <div
                        className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
                        style={{
                          background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.75) 100%)",
                        }}
                      >
                        <Shirt className="w-5 h-5" style={{ color: "hsl(var(--primary-foreground))" }} />
                      </div>

                      <h3 className="font-bold" style={{ color: "hsl(var(--foreground))" }}>
                        Complete Outfit Preview
                      </h3>
                    </div>

                    <motion.div
                      className="relative overflow-hidden rounded-xl border aspect-[3/4] max-w-md w-full mx-auto"
                      style={{
                        borderColor: "hsl(var(--border))",
                      }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {coverImage ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={coverImage}
                            alt={outfit.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 480px"
                            className="object-cover"
                            priority
                          />
                        </div>
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{
                            backgroundColor: "hsl(var(--muted))",
                            color: "hsl(var(--muted-foreground))",
                          }}
                        >
                          No image
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {outfit.description ? (
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <p className="text-white text-center break-words">{outfit.description}</p>
                        </div>
                      ) : null}
                    </motion.div>
                  </div>

                  {/* Items */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-4 min-w-0">
                      <div
                        className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
                        style={{
                          background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.75) 100%)",
                        }}
                      >
                        <ShoppingBag className="w-5 h-5" style={{ color: "hsl(var(--primary-foreground))" }} />
                      </div>

                      <h3 className="font-bold" style={{ color: "hsl(var(--foreground))" }}>
                        Outfit Components
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 min-w-0">
                      {outfit.items.map((item, index) => (
                        <div key={`${item.id ?? item.name}-${index}`} className="min-w-0">
                          
                          <OutfitItemCard
                            index={index}
                            item={{
                              ...item,
                              images: Array.isArray(item.images) ? item.images : [item.images],
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 flex flex-wrap gap-4 min-w-0">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 min-w-[220px] px-6 py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group max-w-full"
                      style={{
                        background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.75) 100%)",
                        color: "hsl(var(--primary-foreground))",
                      }}
                    >
                      <CheckCircle2 className="w-5 h-5 relative z-10 shrink-0" />
                      <span className="relative z-10 break-words">Use This Outfit</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-4 rounded-xl border shadow-lg transition-all duration-300 flex items-center justify-center gap-2 max-w-full"
                      style={{
                        borderColor: "hsl(var(--border))",
                        backgroundColor: "hsl(var(--secondary))",
                        color: "hsl(var(--foreground))",
                      }}
                    >
                      <Heart className="w-5 h-5 shrink-0" />
                      <span className="break-words">Save</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-4 rounded-xl border shadow-lg transition-all duration-300 flex items-center justify-center gap-2 max-w-full"
                      style={{
                        borderColor: "hsl(var(--border))",
                        backgroundColor: "hsl(var(--secondary))",
                        color: "hsl(var(--foreground))",
                      }}
                    >
                      <Share2 className="w-5 h-5 shrink-0" />
                      <span className="break-words">Share</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
