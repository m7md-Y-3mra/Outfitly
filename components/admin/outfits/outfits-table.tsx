"use client";
import React from "react";
import { MoreVertical, Heart, Shirt, Filter, Download } from "lucide-react";
import { motion } from "framer-motion";
import { NAVBAR_COLORS } from "@/components/navbar/navbar.constants";

/* -------------------------------------------------------------------------- */
/*                                Mock Data                                   */
/* -------------------------------------------------------------------------- */
const OUTFITS = [
  {
    id: 1,
    name: "Summer Breeze Set",
    creator: "Emma Watson",
    likes: "12.4k",
    date: "2024-03-15",
    status: "Approved",
  },
  {
    id: 2,
    name: "Urban Street Style",
    creator: "Liam Johnson",
    likes: "8.2k",
    date: "2024-03-14",
    status: "Pending",
  },
  {
    id: 3,
    name: "Casual Friday Look",
    creator: "Sophia Williams",
    likes: "15k",
    date: "2024-03-12",
    status: "Approved",
  },
  {
    id: 4,
    name: "Evening Gala Dress",
    creator: "Noah Brown",
    likes: "3.1k",
    date: "2024-03-10",
    status: "Pending",
  },
  {
    id: 5,
    name: "Winter Cozy Fit",
    creator: "Olivia Jones",
    likes: "22k",
    date: "2024-02-28",
    status: "Approved",
  },
];

/* -------------------------------------------------------------------------- */
/*                              Helper Components                             */
/* -------------------------------------------------------------------------- */

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
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
        isApproved
          ? "bg-green-100 text-green-700 border border-green-200"
          : "bg-amber-100 text-amber-700 border border-amber-200"
      }`}
    >
      {status}
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/*                            Outfits Table Component                         */
/* -------------------------------------------------------------------------- */

export const OutfitsTable = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden"
    >
      {/* Header & Controls (Moved Inside) */}
      <div className="p-6 border-b border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Recent Outfits</h2>
          <p className="text-muted-foreground text-sm mt-1">Review and manage outfit submissions</p>
        </div>

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

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-stone-50/50 border-b border-stone-100">
              <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Outfit
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Creator
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Likes
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Date
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="text-right py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {OUTFITS.map((outfit) => (
              <motion.tr
                key={outfit.id}
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination / Footer */}
      <div className="px-6 py-4 border-t border-stone-100 bg-stone-50/30 flex items-center justify-between text-xs text-muted-foreground">
        <span>Showing 1-5 of 842 outfits</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-md border border-stone-200 hover:bg-white transition-colors disabled:opacity-50">
            Previous
          </button>
          <button className="px-3 py-1 rounded-md border border-stone-200 hover:bg-white transition-colors">
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
};
