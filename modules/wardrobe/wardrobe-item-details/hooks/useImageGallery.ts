import { useState, useMemo } from "react";
import type { WardrobeItemImage } from "@/app/generated/prisma/browser";

export const useImageGallery = (images: WardrobeItemImage[]) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const sortedImages = useMemo(() => {
    return [...images].sort((a, b) => {
      if (a.isPrimary) return -1;
      if (b.isPrimary) return 1;
      return a.displayOrder - b.displayOrder;
    });
  }, [images]);

  return { sortedImages, selectedImage, setSelectedImage };
};
