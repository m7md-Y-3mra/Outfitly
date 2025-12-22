import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Card } from "../../../../components/ui/card";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import type { ProfileLikedOutfitsGridProps } from "./likedOutfits.types";
import { getLikedOutfitAlt } from "./likedOutfits.utils";

export function ProfileLikedOutfitsGrid({ outfits }: ProfileLikedOutfitsGridProps) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
      <Masonry gutter="1.5rem">
        {outfits.slice(0, 6).map((outfit, index) => (
          <motion.div
            key={outfit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group cursor-pointer overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl bg-card border-border"
          >
            <div className="relative overflow-hidden">
              <motion.img
                src={outfit.image}
                alt={getLikedOutfitAlt(outfit.title || "Untitled Outfit")}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg bg-primary/90">
                  <Heart className="w-5 h-5 fill-current text-primary-foreground" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
