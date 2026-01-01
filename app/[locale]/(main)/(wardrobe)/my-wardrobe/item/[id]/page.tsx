import type { Metadata } from "next";
import ItemDetailsPage from "@/modules/wardrobe/wardrobe-item-details";

export const metadata: Metadata = {
  title: "Item Details",
  description: "View details of your wardrobe item.",
};

type ItemDetailPageProps = {
  params: Promise<{ id: string }>;
};

const ItemDetail = async ({ params }: ItemDetailPageProps) => {
  const { id } = await params;

  return <ItemDetailsPage id={id} />;
};

export default ItemDetail;
