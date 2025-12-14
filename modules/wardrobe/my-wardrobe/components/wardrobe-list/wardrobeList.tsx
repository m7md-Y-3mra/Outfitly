import { getUserWardrobeItemAction } from "@/modules/wardrobe/wardrobe.action";
import { SearchParams } from "nuqs";
import { WardrobeCards } from "./wardrobeCards";

const WardrobeList = async ({ searchParams }: { searchParams: SearchParams }) => {
  const res = await getUserWardrobeItemAction({ ...searchParams });
  if (!res.success) {
    throw new Error("Failed to load wardrobe items");
  }
  return <WardrobeCards wardrobeItems={res.data} />;
};

export default WardrobeList;
