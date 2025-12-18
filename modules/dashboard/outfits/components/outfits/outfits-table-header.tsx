"use client";
import React from "react";
import { Filter, Download } from "lucide-react";
import { motion } from "framer-motion";
import { NAVBAR_COLORS } from "@/components/navbar/navbar.constants";
import HeaderTable from "@/modules/dashboard/headerTable";

export const OutfitsTableHeader = () => {
  return (
    <div className="p-6 border-b border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <HeaderTable title="Recent Outfits" description="Review and manage outfit submissions" />

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 bg-white text-sm font-medium text-gray-600 hover:bg-stone-50 transition-colors shadow-sm">
          <Filter className="w-4 h-4" />
          Filter
        </button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-5 py-2 rounded-xl shadow-lg shadow-rose-900/10 text-white text-sm font-medium transition-all"
          style={{
            background: NAVBAR_COLORS.primary,
            color: NAVBAR_COLORS.textLight,
          }}
        >
          <Download className="w-4 h-4" />
          Export
        </motion.button>
      </div>
    </div>
  );
};
