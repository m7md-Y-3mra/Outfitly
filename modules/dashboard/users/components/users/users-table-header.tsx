"use client";
import React from "react";
import { UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { NAVBAR_COLORS } from "@/components/navbar/navbar.constants";
import HeaderTable from "@/modules/dashboard/headerTable";

export const UsersTableHeader = () => {
  return (
    <div className="p-6 border-b border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <HeaderTable title="User Management" description="Manage and monitor all user accounts" />
      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl shadow-lg shadow-rose-900/10 text-white font-medium transition-all"
        style={{
          background: NAVBAR_COLORS.primary,
          color: NAVBAR_COLORS.textLight,
        }}
      >
        <UserPlus className="w-4 h-4" />
        <span>Add User</span>
      </motion.button>
    </div>
  );
};
