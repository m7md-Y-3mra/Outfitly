"use client";
import React from "react";
import { UsersTable } from "@/components/admin/users/users-table";

const UsersPage = () => {
  return (
    <div className="pt-8 space-y-6">
      {/* Main Table Component (Includes Header) */}
      <UsersTable />
    </div>
  );
};

export default UsersPage;
