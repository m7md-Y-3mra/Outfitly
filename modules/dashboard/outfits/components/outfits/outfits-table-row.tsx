"use client";
import React from "react";
import { MoreVertical, Heart, Shirt } from "lucide-react";
import { motion } from "framer-motion";
import { NAVBAR_COLORS } from "@/components/navbar/navbar.constants";
import { OutfitsTableRowProps } from "@/modules/dashboard/outfits/types/outfits.types";
import { Badge } from "@/components/ui/badge";

const OutfitThumbnail = () => (
  <div
    className="w-10 h-10 rounded-xl flex items-center justify-center"
    style={{
      background: NAVBAR_COLORS.primary,
      opacity: 0.9,
    }}
  >
    <Shirt className="w-5 h-5 text-white" />
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const isApproved = status === "Approved";
  return (
    <Badge
      variant={isApproved ? "success" : "warning"}
      className="px-3 py-1 text-xs font-semibold tracking-wide border"
    >
      {status}
    </Badge>
  );
};

export const OutfitsTableRow = ({ outfit }: OutfitsTableRowProps) => {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="group hover:bg-stone-50/60 transition-colors duration-200"
    >
      <td className="py-4 px-6">
        <div className="flex items-center gap-4">
          <OutfitThumbnail />
          <span className="font-bold text-gray-900">{outfit.name}</span>
        </div>
      </td>
      <td className="py-4 px-6 text-sm text-gray-600 font-medium">{outfit.creator}</td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-1.5 text-gray-700 font-semibold">
          <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
          {outfit.likes}
        </div>
      </td>
      <td className="py-4 px-6 text-sm text-gray-500">{outfit.date}</td>
      <td className="py-4 px-6">
        <StatusBadge status={outfit.status} />
      </td>
      <td className="py-4 px-6 text-right">
        <button className="p-2 rounded-lg hover:bg-stone-100 text-gray-400 hover:text-gray-600 transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </td>
    </motion.tr>
  );
};
