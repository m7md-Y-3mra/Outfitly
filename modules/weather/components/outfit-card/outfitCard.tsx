"use client";

import { motion } from "framer-motion";
import { ChevronRight, Sun } from "lucide-react";
import { Card } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { OutfitCardProps } from "./outfitCard.types";

export const OutfitCard: React.FC<OutfitCardProps> = ({ outfit, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="group"
    >
      <Card className="gap-0 py-0 cursor-pointer overflow-hidden border-2 border-[var(--outfitly-bg-secondary)] dark:border-[var(--outfitly-bg-tertiary)] bg-[var(--card)] transition-all duration-300 hover:shadow-2xl h-full">
        {/* Time Badge Section */}
        <div className="p-4 border-b-2 border-[var(--border)] bg-[var(--muted)] transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md bg-gradient-to-br from-[var(--outfitly-gradient-start)] to-[var(--outfitly-gradient-mid)]">
                {outfit.icon ? (
                  <outfit.icon className="w-5 h-5 text-[var(--outfitly-text-light)] dark:text-[var(--outfitly-text-primary)]" />
                ) : (
                  <Sun className="w-5 h-5 text-[var(--outfitly-text-light)] dark:text-[var(--outfitly-text-primary)]" />
                )}
              </div>
              <div>
                <div className="font-bold text-[var(--outfitly-primary)] dark:text-[var(--outfitly-text-primary)] transition-colors duration-300">
                  {outfit.time}
                </div>
                <div className="text-xs text-[var(--outfitly-text-primary)] dark:text-[var(--outfitly-text-primary)] opacity-70 transition-colors duration-300">
                  {outfit.timeRang}
                </div>
              </div>
            </div>
            <Badge className="shadow-md bg-[var(--muted)] text-[var(--outfitly-primary)] dark:text-[var(--outfitly-text-primary)]">
              {outfit.temperature}
            </Badge>
          </div>
        </div>

        {/* Outfit Image with Overlay */}
        <div className="relative overflow-hidden aspect-[3/4]">
          <motion.img
            src={outfit.image}
            alt={outfit.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white mb-1">{outfit.name}</h3>
            <p className="text-white/80 text-sm">{outfit.description}</p>
          </div>
        </div>

        {/* View Button */}
        <div className="p-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-4 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-br from-[var(--outfitly-gradient-start)] to-[var(--outfitly-gradient-mid)] text-[var(--outfitly-text-light)] dark:text-[var(--outfitly-text-primary)]"
            onClick={() => console.log("View outfit:", outfit.id)}
          >
            <span>View Outfit</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </Card>
    </motion.div>
  );
};
