import { notFound } from "next/navigation";
import { getWardrobeItemDetailsAction } from "@/modules/wardrobe/wardrobe.action";
import { ItemDetailsContent } from "./components/itemDetailsContent";

type ItemDetailsPageProps = {
  id: string;
};

const ItemDetailsPage = async ({ id }: ItemDetailsPageProps) => {
  const res = await getWardrobeItemDetailsAction({ id });

  if (!res.success || !res.data) {
    notFound();
  }

  return <ItemDetailsContent item={res.data} />;
};

export default ItemDetailsPage;
