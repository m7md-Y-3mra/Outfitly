import ItemDetailsPage from "@/modules/wardrobe/wardrobe-item-details";

type ItemDetailPageProps = {
  params: Promise<{ id: string }>;
};

const ItemDetail = async ({ params }: ItemDetailPageProps) => {
  const { id } = await params;

  return <ItemDetailsPage id={id} />;
};

export default ItemDetail;
