import { Calendar, Package, Palette, Ruler, Sun, Tag } from "lucide-react";
import type { WardrobeItemWithImages } from "@/modules/wardrobe/types";

export type DetailItemConfig = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  valueGetter: (item: WardrobeItemWithImages) => string;
};

export const DETAIL_ITEMS_CONFIG: DetailItemConfig[] = [
  {
    icon: Tag,
    label: "Category",
    valueGetter: (item) => item.category?.name || "Uncategorized",
  },
  {
    icon: Tag,
    label: "Brand",
    valueGetter: (item) => item.brand,
  },
  {
    icon: Palette,
    label: "Color",
    valueGetter: (item) => item.color,
  },
  {
    icon: Ruler,
    label: "Size",
    valueGetter: (item) => item.size,
  },
  {
    icon: Sun,
    label: "Season",
    valueGetter: (item) => item.season,
  },
  {
    icon: Calendar,
    label: "Purchased",
    valueGetter: (item) =>
      new Date(item.purchasedDate).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
  },
  {
    icon: Package,
    label: "Style",
    valueGetter: (item) => item.style.charAt(0) + item.style.slice(1).toLowerCase(),
  },
];
