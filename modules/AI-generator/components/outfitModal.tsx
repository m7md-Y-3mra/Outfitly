"use client";

import { useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Shirt, ShoppingBag, CheckCircle2, RefreshCw } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { IOutfitForModal } from "./aiGenerator";
import OutfitItemCard from "./outfitItemCard";
import { safeImageSrc } from "../ai.utils";

type OutfitPreviewModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  outfit: IOutfitForModal;
};

export function OutfitPreviewModal({ open, onClose, onSave, outfit }: OutfitPreviewModalProps) {
  const coverImage = useMemo(
    () => safeImageSrc(outfit.image ?? outfit?.items[0]?.images),
    [outfit],
  );
  const itemsCount = outfit?.items?.length ?? 0;

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

  const outfitlyGradient = useMemo(
    () =>
      "linear-gradient(135deg, var(--outfitly-gradient-start) 0%, var(--outfitly-gradient-mid) 50%, var(--outfitly-gradient-end) 100%)",
    [],
  );

  const panelBorder = "border-2 border-[var(--outfitly-border-medium)]";
  const panelBg = "bg-[var(--outfitly-bg-primary)]";
  const subtleBg = "bg-[var(--outfitly-bg-secondary)]";
  const textPrimary = "text-[var(--outfitly-text-primary)]";
  const textSecondary = "text-[var(--outfitly-text-secondary)]";
  const textLight = "text-[var(--outfitly-text-light)]";

  const iconChip = "shrink-0 w-10 h-10 rounded-lg flex items-center justify-center shadow-md";

  const badgeBase = "shadow-md border border-[var(--outfitly-border-medium)]";

  const badgePrimary =
    "bg-[var(--outfitly-primary)] text-[var(--outfitly-text-light)] border-transparent";

  const badgeNeutral = `${subtleBg} ${textSecondary} ${badgeBase}`;

  const actionBtnPrimary =
    "cursor-pointer flex-1 min-w-[220px] px-6 py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group max-w-full";

  const actionBtnSecondary =
    "px-6 py-4 rounded-xl border-2 border-[var(--outfitly-border-medium)] shadow-lg transition-all duration-300 flex items-center justify-center gap-2 max-w-full " +
    `${subtleBg} ${textSecondary}`;

  const closeBtn =
    "shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 " +
    `border-[var(--outfitly-border-medium)] ${subtleBg}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50"
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
          onClick={onClose}
        >
          <div className="fixed inset-0 p-4 sm:p-6 flex items-center justify-center overflow-x-hidden custom-scroll">
            <motion.div
              key="panel"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.3,
              }}
              onClick={(e) => e.stopPropagation()}
              className={[
                "relative w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-y-auto overflow-x-hidden",
                panelBorder,
                panelBg,
              ].join(" ")}
            >
              <div
                className="pointer-events-none absolute -inset-1 rounded-2xl opacity-20 blur-xl"
                style={{ background: outfitlyGradient }}
              />

              <div className="relative min-w-0 overflow-x-hidden">
                <div
                  className={[
                    "sticky top-0 z-10 p-6 border-b-2 backdrop-blur-sm min-w-0",
                    "border-[var(--outfitly-border-medium)]",
                  ].join(" ")}
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--outfitly-bg-primary) 92%, transparent)",
                  }}
                >
                  <div className="flex items-start justify-between gap-4 min-w-0">
                    <div className="min-w-0">
                      <h2
                        className="mb-2 break-words text-transparent bg-clip-text text-2xl font-black"
                        style={{ backgroundImage: outfitlyGradient }}
                      >
                        {outfit.name}
                      </h2>

                      {outfit.description ? (
                        <p className={`text-sm opacity-80 break-words ${textPrimary}`}>
                          {outfit.description}
                        </p>
                      ) : null}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.08, rotate: 90 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={onClose}
                      className={closeBtn}
                      aria-label="Close"
                    >
                      <X className={`w-5 h-5 ${textSecondary}`} />
                    </motion.button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-4 min-w-0">
                    {typeof outfit.confidence === "number" ? (
                      <Badge className={badgePrimary}>{outfit.confidence}% Match</Badge>
                    ) : null}

                    <Badge className={badgeNeutral}>{itemsCount} Items</Badge>

                    {outfit.style ? <Badge className={badgeNeutral}>{outfit.style}</Badge> : null}
                  </div>
                </div>

                <div className="p-6 min-w-0 overflow-x-hidden">
                  <div className="mb-8 min-w-0">
                    <div className="flex items-center gap-3 mb-4 min-w-0">
                      <div className={iconChip} style={{ backgroundImage: outfitlyGradient }}>
                        <Shirt className={`w-5 h-5 ${textLight}`} />
                      </div>

                      <h3 className={`font-bold ${textSecondary}`}>Complete Outfit Preview</h3>
                    </div>

                    <motion.div
                      className={[
                        "relative overflow-hidden rounded-xl aspect-[3/4] max-w-md w-full mx-auto",
                        panelBorder,
                      ].join(" ")}
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
                          className={`w-full h-full flex items-center justify-center ${subtleBg} ${textPrimary}`}
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

                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-4 min-w-0">
                      <div className={iconChip} style={{ backgroundImage: outfitlyGradient }}>
                        <ShoppingBag className={`w-5 h-5 ${textLight}`} />
                      </div>

                      <h3 className={`font-bold ${textSecondary}`}>Outfit Components</h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 min-w-0">
                      {outfit.items.map((item, index) => (
                        <div key={`${item.id ?? item.name}-${index}`} className="min-w-0">
                          <OutfitItemCard index={index} item={{ ...item, images: item.images }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 flex flex-wrap gap-4 min-w-0">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onSave(outfit.name)}
                      className={actionBtnPrimary}
                      style={{ backgroundImage: outfitlyGradient }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.20), transparent)",
                        }}
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                      />
                      <CheckCircle2 className={`w-5 h-5 relative z-10 shrink-0 ${textLight}`} />
                      <span className={`relative z-10 break-words ${textLight}`}>Save Outfit</span>
                    </motion.button>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className={actionBtnSecondary}
                    >
                      <RefreshCw className="w-5 h-5 shrink-0" />
                      <span className="break-words">Regenerate</span>
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
