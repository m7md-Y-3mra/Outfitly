import type { WardrobeItemImage } from "@/app/generated/prisma/browser";

export type ImageGalleryProps = {
  sortedImages: WardrobeItemImage[];
  selectedImage: number;
  onImageSelect: (index: number) => void;
  itemName: string;
};
