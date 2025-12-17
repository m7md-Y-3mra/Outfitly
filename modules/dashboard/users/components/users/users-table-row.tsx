"use client";
import React from "react";
import { MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import { NAVBAR_COLORS } from "@/components/navbar/navbar.constants";
import { UsersTableRowProps } from "@/modules/dashboard/users/types/users.types";

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

export const UsersTableRow = ({ user }: UsersTableRowProps) => {
  return (
    <motion.tr
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
  );
};
