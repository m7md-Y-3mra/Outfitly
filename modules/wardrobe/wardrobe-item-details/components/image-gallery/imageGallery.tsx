"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { ImageGalleryProps } from "./imageGallery.types";

const ImageGallery = ({
  sortedImages,
  selectedImage,
  onImageSelect,
  itemName,
}: ImageGalleryProps) => {
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <Card className="overflow-hidden border-2 transition-all duration-300">
        <div className="relative aspect-square bg-linear-to-br from-muted/30 to-muted/10">
          {sortedImages.length > 0 ? (
            <motion.div
              key={selectedImage}
              className="relative w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={sortedImages[selectedImage].imageUrl}
                alt={sortedImages[selectedImage].altText || itemName}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No image available
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </Card>

      {/* Thumbnail Gallery */}
      {sortedImages.length > 1 && (
        <div className="grid grid-cols-3 gap-4">
          {sortedImages.map((image, index) => (
            <motion.div
              key={image.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onImageSelect(index)}
              className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                selectedImage === index
                  ? "ring-2 ring-offset-2 ring-primary"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={image.imageUrl}
                alt={image.altText || `${itemName} ${index + 1}`}
                fill
                className="object-cover"
                sizes="200px"
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
