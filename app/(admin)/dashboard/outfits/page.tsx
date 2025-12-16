"use client";
import React from "react";
import { Download, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { NAVBAR_COLORS } from "@/components/navbar/navbar.constants";
import { OutfitsStats } from "@/components/admin/outfits/outfits-stats";
import { OutfitsTable } from "@/components/admin/outfits/outfits-table";

const OutfitsPage = () => {
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

export default OutfitsPage;
