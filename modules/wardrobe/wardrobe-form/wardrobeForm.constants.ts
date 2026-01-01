import { WardrobeStyle } from "@/app/generated/prisma/browser";
import type { SelectOption } from "@/components/motioned-select";

// Style options from Prisma enum
export const STYLE_OPTIONS: SelectOption[] = [
  { label: "Casual", value: WardrobeStyle.CASUAL },
  { label: "Formal", value: WardrobeStyle.FORMAL },
  { label: "Work", value: WardrobeStyle.WORK },
  { label: "Sporty", value: WardrobeStyle.SPORTY },
  { label: "Streetwear", value: WardrobeStyle.STREETWEAR },
  { label: "Loungewear", value: WardrobeStyle.LOUNGEWEAR },
  { label: "Party", value: WardrobeStyle.PARTY },
];
