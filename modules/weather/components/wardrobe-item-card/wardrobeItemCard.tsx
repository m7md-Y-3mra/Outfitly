"use client";
import { motion } from "framer-motion";
import { Card } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { WardrobeItemCardProps } from "./wardrobeItemCard.types";

export const WardrobeItemCard: React.FC<WardrobeItemCardProps> = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.05 * index }}
      className="flex-shrink-0 w-48 snap-start"
    >
      <Card className="group cursor-pointer overflow-hidden border-2 border-[var(--outfitly-bg-secondary)] dark:border-[var(--outfitly-bg-tertiary)] bg-[var(--card)] transition-all duration-300 hover:shadow-xl">
        <div className="relative overflow-hidden aspect-square">
          <motion.img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Category Badge */}
          <div className="absolute top-2 right-2">
            <Badge className="backdrop-blur-sm shadow-md text-xs bg-[rgba(103,20,37,0.9)] text-[var(--outfitly-text-light)]">
              {item.category}
            </Badge>
          </div>
        </div>

        <div className="p-3">
          <h4 className="text-sm transition-colors duration-300 text-[var(--outfitly-primary)] dark:text-[var(--outfitly-text-primary)]">
            {item.name}
          </h4>
        </div>
      </Card>
    </motion.div>
  );
};
