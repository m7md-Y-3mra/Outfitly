import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Card } from "../../../../components/ui/card";
import type { ProfileOutfitsGridProps } from "./profileOutfits.types";
import { getOutfitAlt } from "./profileOutfits.utils";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

export function ProfileOutfitsGrid({ outfits }: ProfileOutfitsGridProps) {
  return (

          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 4 }}>
            <Masonry gutter="1.5rem">
      {outfits.map((outfit, index) => (
        <motion.div
          key={outfit.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
          <Card className="group cursor-pointer overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl bg-card border-border">
            <div className="relative overflow-hidden">
              <motion.img
                src={outfit.image}
                alt={getOutfitAlt(outfit.title)}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white mb-2">{outfit.title}</h3>
                  <div className="flex items-center gap-2 text-white/90">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{outfit.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}

            </Masonry>
    </ResponsiveMasonry>
  );
}