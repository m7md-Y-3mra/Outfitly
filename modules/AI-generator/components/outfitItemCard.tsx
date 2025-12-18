"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ImageOff, Palette, StickyNote, Snowflake, Sun, Leaf } from "lucide-react";

type OutfitItemCardProps = {
  index?: number;
  item: {
    id: string | number;
    name: string;
    color?: string;
    notes?: string;
    season?: string | string[];
    images: string;
    category?: { name?: string };
  };
};

const getSeasonIconEl = (season?: string) => {
  const s = (season || "").toLowerCase();

  if (s.includes("winter")) return <Snowflake className="w-4 h-4" />;
  if (s.includes("summer")) return <Sun className="w-4 h-4" />;
  if (s.includes("spring")) return <Leaf className="w-4 h-4" />;
  if (s.includes("fall") || s.includes("autumn")) return <Leaf className="w-4 h-4" />;

  return <Leaf className="w-4 h-4" />;
};

export function OutfitItemCard({ item, index = 0 }: OutfitItemCardProps) {
  const image = item.images || "";
  const seasonDisplay = Array.isArray(item.season) ? item.season[0] : item.season;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.35) }}
      whileHover={{ y: -3 }}
      className="group relative rounded-2xl border-2 overflow-hidden shadow-lg min-w-0 max-w-full overflow-x-hidden"
      style={{
        borderColor: "var(--outfitly-bg-tertiary, var(--outfitly-bg-secondary))",
        backgroundColor: "var(--outfitly-bg-primary)",
        boxShadow: "0 10px 30px var(--outfitly-shadow)",
      }}
    >
      <div
        className="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(135deg, var(--outfitly-gradient-start) 0%, var(--outfitly-gradient-mid) 50%, var(--outfitly-gradient-end) 100%)",
        }}
      />

      <div className="relative min-w-0">
        <div
          className="relative w-full aspect-[4/5] overflow-hidden min-w-0"
          style={{ backgroundColor: "var(--outfitly-bg-secondary)" }}
        >
          {image ? (
            <Image
              src={image}
              alt={item.name}
              fill
              sizes="(min-width: 1024px) 260px, (min-width: 768px) 240px, 100vw"
              className="object-cover max-w-full group-hover:scale-110 transition-transform duration-500"
              draggable={false}
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-2 text-sm"
              style={{ color: "var(--outfitly-text-primary)" }}
            >
              <ImageOff className="w-6 h-6 opacity-70" />
              <span className="opacity-80">No image</span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {item.category?.name && (
            <div className="absolute top-3 left-3 max-w-[70%]">
              <span
                className="text-xs px-3 py-1 rounded-full border inline-flex max-w-full truncate backdrop-blur-sm shadow-lg"
                style={{
                  borderColor: "var(--outfitly-border-medium)",
                  backgroundColor: "color-mix(in srgb, var(--outfitly-primary) 90%, transparent)",
                  color: "var(--outfitly-text-light)",
                }}
                title={item.category.name}
              >
                {item.category.name}
              </span>
            </div>
          )}

          {seasonDisplay && (
            <div className="absolute top-3 right-3 max-w-[70%]">
              <span
                className="text-xs px-3 py-1 rounded-full border inline-flex items-center gap-2 max-w-full backdrop-blur-sm shadow-lg"
                style={{
                  borderColor: "var(--outfitly-border-medium)",
                  backgroundColor: "rgba(0,0,0,0.55)",
                  color: "var(--outfitly-text-light)",
                }}
                title={seasonDisplay}
              >
                <span className="shrink-0">{getSeasonIconEl(seasonDisplay)}</span>
                <span className="max-w-[120px] truncate">{seasonDisplay}</span>
              </span>
            </div>
          )}
        </div>

        <div className="p-4 min-w-0 relative">
          <h4
            className="leading-snug break-words"
            style={{ color: "var(--outfitly-text-secondary)" }}
          >
            {item.name}
          </h4>

          {item.color && (
            <div className="mt-2 flex items-center gap-2 min-w-0">
              <Palette
                className="w-4 h-4 shrink-0"
                style={{ color: "var(--outfitly-gradient-mid)" }}
              />
              <span
                className="text-sm opacity-80 truncate"
                style={{ color: "var(--outfitly-text-primary)" }}
                title={item.color}
              >
                {item.color}
              </span>
            </div>
          )}

          {item.notes && (
            <div className="mt-2 flex items-start gap-2 min-w-0">
              <StickyNote
                className="w-4 h-4 mt-0.5 shrink-0"
                style={{ color: "var(--outfitly-gradient-mid)" }}
              />
              <p
                className="text-sm opacity-75 break-words line-clamp-2"
                style={{ color: "var(--outfitly-text-primary)" }}
                title={item.notes}
              >
                {item.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default OutfitItemCard;
