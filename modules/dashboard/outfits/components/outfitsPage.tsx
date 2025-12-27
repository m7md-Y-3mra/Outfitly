import { OutfitsStats } from "@/components/admin/outfits/outfits-stats";
import { OutfitsTable } from "@/modules/dashboard/outfits/components/outfits/outfits-table";
import {
  getOutfitForDashboardPaginated,
  getOutfitPageStats,
} from "@/modules/dashboard/dashboard.service";

interface OutfitsPageWrapperProps {
  page?: number;
}

const OutfitsPageWrapper = async ({ page = 1 }: OutfitsPageWrapperProps) => {
  const [{ outfits, meta }, stats] = await Promise.all([
    getOutfitForDashboardPaginated(page),
    getOutfitPageStats(),
  ]);

  return (
    <div className="pt-8 space-y-8">
      {/* 1. Stats Section */}
      <OutfitsStats stats={stats} />

      {/* 2. Main Content Section */}
      <div className="space-y-6">
        {/* Table Component (Includes Header) */}
        <OutfitsTable outfits={outfits} meta={meta} />
      </div>
    </div>
  );
};

export default OutfitsPageWrapper;
