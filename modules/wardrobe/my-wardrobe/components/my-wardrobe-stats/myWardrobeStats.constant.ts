import { GetWardrobeStatsResponse } from "@/modules/wardrobe/types/dto.types";
import { Shirt, Puzzle, Footprints, ShoppingBag } from "lucide-react";

export const stats = (data: GetWardrobeStatsResponse) => [
  {
    labelKey: "totalItems",
    value: data.total,
    icon: ShoppingBag,
    gradient: "from-[#671425] to-[#8B1D35]",
  },
  {
    labelKey: "tops",
    value: data.byCategory["T-Shirts"],
    icon: Shirt,
    gradient: "from-[#8B1D35] to-[#A82444]",
  },
  {
    labelKey: "bottoms",
    value: data.byCategory["Jeans"],
    icon: Puzzle,
    gradient: "from-[#A82444] to-[#671425]",
  },
  {
    labelKey: "shoes",
    value: data.byCategory["Boots"],
    icon: Footprints,
    gradient: "from-[#671425] to-[#4C1420]",
  },
];
