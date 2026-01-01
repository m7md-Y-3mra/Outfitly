import type { Metadata } from "next";
import OutfitsPageWrapper from "@/modules/dashboard/outfits/components/outfitsPage";

export const metadata: Metadata = {
  title: "Outfits Management",
  description: "Manage outfits on Outfitly.",
};

interface OutfitsPageProps {
  searchParams: Promise<{ page?: string }>;
}

const OutfitsPage = async ({ searchParams }: OutfitsPageProps) => {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  return <OutfitsPageWrapper page={page} />;
};

export default OutfitsPage;
