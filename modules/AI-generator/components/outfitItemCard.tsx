"use client";

import { motion } from "framer-motion";
import {
  ImageOff,
  Palette,
  StickyNote,
  Snowflake,
  Sun,
  Leaf,
} from "lucide-react";
import { useTheme } from "next-themes";


type OutfitItemCardProps = {
  index?: number;
  item: {
    id: string;
    name: string;
    color?: string;
    notes?: string;
    season?: string;
    images: string[];
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
  const { theme } = useTheme();

  const image = item.images?.[0] || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.35) }}
      whileHover={{ y: -3 }}
      className="group relative rounded-2xl border-2 overflow-hidden shadow-lg min-w-0 max-w-full overflow-x-hidden"
      style={{
        borderColor: theme === "dark" ? "#35353D" : "#F2E8E3",
        backgroundColor: theme === "dark" ? "#1a1a1a" : "#FFFFFF",
      }}
    >
      {/* subtle glow */}
      <div
        className="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(135deg, #671425 0%, #8B1D35 50%, #A82444 100%)",
        }}
      />

      <div className="relative min-w-0">
        {/* Image */}
        <div
          className="relative w-full aspect-[4/5] overflow-hidden min-w-0"
          style={{
            backgroundColor: theme === "dark" ? "#2A2A30" : "#F2E8E3",
          }}
        >
          {image ? (
            <img
              src={image}
              alt={item.name}
              className="w-full h-full object-cover max-w-full"
              draggable={false}
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-2 text-sm"
              style={{ color: theme === "dark" ? "#FAF1ED" : "#4C1420" }}
            >
              <ImageOff className="w-6 h-6 opacity-70" />
              <span className="opacity-80">No image</span>
            </div>
          )}

          {/* overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category */}
          {item.category?.name && (
            <div className="absolute top-3 left-3 max-w-[70%]">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full border inline-flex max-w-full truncate"
                style={{
                  borderColor: "rgba(250, 241, 237, 0.25)",
                  backgroundColor: "rgba(0,0,0,0.35)",
                  color: "#FAF1ED",
                }}
                title={item.category.name}
              >
                {item.category.name}
              </span>
            </div>
          )}

          {/* Season */}
          {item.season && (
            <div className="absolute top-3 right-3 max-w-[70%]">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full border inline-flex items-center gap-2 max-w-full"
                style={{
                  borderColor: "rgba(250, 241, 237, 0.25)",
                  backgroundColor: "rgba(0,0,0,0.35)",
                  color: "#FAF1ED",
                }}
                title={item.season}
              >
                <span className="shrink-0">{getSeasonIconEl(item.season)}</span>
                <span className="max-w-[120px] truncate">{item.season}</span>
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 min-w-0">
          <h4
            className="font-extrabold leading-snug break-words"
            style={{ color: theme === "dark" ? "#FAF1ED" : "#671425" }}
          >
            {item.name}
          </h4>

          {/* Color */}
          {item.color && (
            <div className="mt-2 flex items-center gap-2 min-w-0">
              <Palette
                className="w-4 h-4 shrink-0"
                style={{ color: theme === "dark" ? "#FAF1ED" : "#8B1D35" }}
              />
              <span
                className="text-sm opacity-80 truncate"
                style={{ color: theme === "dark" ? "#FAF1ED" : "#4C1420" }}
                title={item.color}
              >
                {item.color}
              </span>
            </div>
          )}

          {/* Notes */}
          {item.notes && (
            <div className="mt-2 flex items-start gap-2 min-w-0">
              <StickyNote
                className="w-4 h-4 mt-0.5 shrink-0"
                style={{ color: theme === "dark" ? "#FAF1ED" : "#8B1D35" }}
              />
              <p
                className="text-sm opacity-75 break-words line-clamp-2"
                style={{ color: theme === "dark" ? "#FAF1ED" : "#4C1420" }}
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
