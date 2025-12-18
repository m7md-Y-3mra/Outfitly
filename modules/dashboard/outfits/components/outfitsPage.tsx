import React from "react";
import { OutfitsStats } from "@/components/admin/outfits/outfits-stats";
import { OutfitsTable } from "@/modules/dashboard/outfits/components/outfits/outfits-table";

const OutfitsPageWrapper = () => {
  return (
    <div className="pt-8 space-y-8">
      {/* 1. Stats Section */}
      <OutfitsStats />

      {/* 2. Main Content Section */}
      <div className="space-y-6">
        {/* Table Component (Includes Header) */}
        <OutfitsTable />
      </div>
    </div>
  );
};

export default OutfitsPageWrapper;
