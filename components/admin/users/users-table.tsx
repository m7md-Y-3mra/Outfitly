"use client";
import React from "react";
import { MoreVertical, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { NAVBAR_COLORS } from "@/components/navbar/navbar.constants";

/* -------------------------------------------------------------------------- */
/*                                Mock Data                                   */
/* -------------------------------------------------------------------------- */
const USERS = [
  {
    id: 1,
    name: "Emma Watson",
    email: "emma.watson@example.com",
    outfits: 12,
    status: "Active",
    joined: "2024-01-15",
  },
  {
    id: 2,
    name: "Liam Johnson",
    email: "liam.j@example.com",
    outfits: 5,
    status: "Suspended",
    joined: "2024-02-10",
  },
  {
    id: 3,
    name: "Sophia Williams",
    email: "sophia.w@example.com",
    outfits: 24,
    status: "Active",
    joined: "2023-11-05",
  },
  {
    id: 4,
    name: "Noah Brown",
    email: "noah.b@example.com",
    outfits: 8,
    status: "Active",
    joined: "2024-03-01",
  },
  {
    id: 5,
    name: "Olivia Jones",
    email: "olivia.j@example.com",
    outfits: 0,
    status: "Suspended",
    joined: "2024-02-28",
  },
];

/* -------------------------------------------------------------------------- */
/*                              Helper Components                             */
/* -------------------------------------------------------------------------- */

const UserAvatar = ({ name }: { name: string }) => {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md"
      style={{
        background: NAVBAR_COLORS.primary,
        fontSize: "16px",
      }}
    >
      {initial}
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const isActive = status === "Active";
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
        isActive
          ? "bg-green-100 text-green-700 border border-green-200"
          : "bg-red-100 text-red-700 border border-red-200"
      }`}
    >
      {status}
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/*                            Users Table Component                           */
/* -------------------------------------------------------------------------- */

export const UsersTable = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden"
    >
      {/* Header & Controls (Moved Inside) */}
      <div className="p-6 border-b border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">User Management</h1>
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
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="group hover:bg-stone-50/60 transition-colors duration-200"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <UserAvatar name={user.name} />
                    <span className="font-semibold text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-500 font-medium">{user.email}</td>
                <td className="py-4 px-6">
                  <span className="font-bold text-gray-700">{user.outfits}</span>
                </td>
                <td className="py-4 px-6">
                  <StatusBadge status={user.status} />
                </td>
                <td className="py-4 px-6 text-sm text-gray-500">{user.joined}</td>
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
        <span>Showing 1-5 of 128 users</span>
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
