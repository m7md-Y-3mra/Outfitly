"use client";
import { motion } from "framer-motion";
import { Heart, User } from "lucide-react";
import { IOutfit } from "../types/explore.type";
import { ActionDispatch } from "react";
import { Action } from "../state/explore.reducer";
import useOutfit from "../hook/useOutfit";

interface OutfitCardProps {
  outfit: IOutfit;
  index: number;
  dispatch: ActionDispatch<[action: Action]>;
}

export const OutfitCard = ({ outfit, index, dispatch }: OutfitCardProps) => {
  const { theme, onToggleLike } = useOutfit(outfit, dispatch);
  return (
    <motion.div
      key={outfit.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-xl border-2 transition-all duration-300 shadow-lg hover:shadow-2xl"
      style={{
        borderColor: theme === "dark" ? "var(--outfitly-primary)" : "var(--outfitly-bg-secondary)",
        backgroundColor:
          theme === "dark" ? "var(--outfitly-bg-secondary)" : "var(--outfitly-bg-white)",
      }}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src={outfit.image || ""}
          alt={`Outfit by ${outfit.username}`}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <motion.button
          onClick={onToggleLike}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 border-2"
          style={{
            backgroundColor: outfit.isLiked
              ? "var(--outfitly-primary)"
              : "rgba(255, 255, 255, 0.2)",
            borderColor: outfit.isLiked ? "var(--outfitly-primary)" : "var(--outfitly-bg-white)",
          }}
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${
              outfit.isLiked ? "fill-current" : ""
            }`}
            style={{
              color: outfit.isLiked ? "var(--outfitly-text-light)" : "var(--outfitly-bg-white)",
            }}
          />
        </motion.button>
      </div>

      <div
        className="p-4 transition-colors duration-300"
        style={{
          backgroundColor:
            theme === "dark" ? "var(--outfitly-bg-secondary)" : "var(--outfitly-bg-white)",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--outfitly-primary)" }}
          >
            <User className="w-4 h-4" style={{ color: "var(--outfitly-text-light)" }} />
          </div>
          <span
            className="transition-colors duration-300"
            style={{
              color: theme === "dark" ? "var(--outfitly-text-light)" : "var(--outfitly-primary)",
            }}
          >
            @{outfit.username}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Heart
            className={`w-4 h-4 ${outfit.isLiked ? "fill-current" : ""}`}
            style={{
              color: outfit.isLiked
                ? "var(--outfitly-primary)"
                : theme === "dark"
                  ? "var(--outfitly-text-light)"
                  : "var(--outfitly-primary)",
            }}
          />
          <span
            className="text-sm transition-colors duration-300"
            style={{
              color:
                theme === "dark" ? "var(--outfitly-text-light)" : "var(--outfitly-text-primary)",
            }}
          >
            {outfit.likes.toLocaleString()}
          </span>
        </div>

        <motion.div
          className="mt-3 h-0.5 bg-gradient-to-r from-[var(--outfitly-gradient-start)] via-[var(--outfitly-gradient-mid)] to-[var(--outfitly-gradient-end)] rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
};
