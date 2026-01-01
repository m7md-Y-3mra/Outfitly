import { getUserWardrobeItemAction } from "@/modules/wardrobe/wardrobe.action";
import { WardrobeCards } from "./wardrobeCards";
import WardrobePagination from "../wardrobe-pagination";
import { GetUserWardrobeItemDTO } from "@/modules/wardrobe/types/dto.types";

const WardrobeList = async ({ searchParams }: { searchParams: GetUserWardrobeItemDTO }) => {
  const res = await getUserWardrobeItemAction({ ...searchParams });
  if (!res.success) {
    throw new Error("Failed to load wardrobe items");
  }
  const { items, ...rest } = res.data;
  return (
    <>
      <div className="py-10">
        <WardrobeCards wardrobeItems={items} />
      </div>
      <WardrobePagination paginationDetails={rest} />
    </>
  );
};

export default WardrobeList;
