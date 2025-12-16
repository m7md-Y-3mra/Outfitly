"use client";
import React from "react";
import { UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { NAVBAR_COLORS } from "@/components/navbar/navbar.constants";
import { UsersTable } from "@/components/admin/users/users-table";

const UsersPage = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">User Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage and monitor all user accounts</p>
        </div>

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

      {/* Main Table Component */}
      <UsersTable />
    </div>
  );
};

export default UsersPage;
