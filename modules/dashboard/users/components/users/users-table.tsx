"use client";
import React from "react";
import { motion } from "framer-motion";
import { USERS } from "./users-table.constants";
import { UsersTableHeader } from "./users-table-header";
import { UsersTableRow } from "./users-table-row";
import TablePagination from "@/modules/dashboard/tablePagination";

export const UsersTable = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden"
    >
      {/* Header & Controls */}
      <UsersTableHeader />

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-stone-50/50 border-b border-stone-100">
              <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                User
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Email
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Outfits
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Joined
              </th>
              <th className="text-right py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {USERS.map((user) => (
              <UsersTableRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination / Footer */}
      <TablePagination />
    </motion.div>
  );
};
