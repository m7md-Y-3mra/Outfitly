import { AdminNavbar } from "@/components/admin/admin-navbar";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black/20">
      <AdminNavbar />
      <main className="pt-24 pb-8 max-w-7xl mx-auto px-6">{children}</main>
    </div>
  );
}
