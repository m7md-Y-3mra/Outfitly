"use client";
import React from "react";
import { motion } from "framer-motion";

interface Column {
  label: string;
  className?: string;
}

interface DashboardTableProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  columns: Column[];
  children: React.ReactNode;
}

export const DashboardTable = ({ header, footer, columns, children }: DashboardTableProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden"
    >
      {/* Header & Controls */}
      {header}

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-stone-50/50 border-b border-stone-100">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={`py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider ${
                    col.className || "text-left"
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">{children}</tbody>
        </table>
      </div>

      {/* Pagination / Footer */}
      {footer}
    </motion.div>
  );
};
