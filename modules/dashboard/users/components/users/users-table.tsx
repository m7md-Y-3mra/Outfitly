"use client";
import React from "react";
import { USERS } from "./users-table.constants";
import { UsersTableHeader } from "./users-table-header";
import { UsersTableRow } from "./users-table-row";
import TablePagination from "@/modules/dashboard/tablePagination";
import { DashboardTable } from "@/modules/dashboard/components/dashboard-table";

const columns = [
  { label: "User" },
  { label: "Email" },
  { label: "Outfits" },
  { label: "Status" },
  { label: "Joined" },
  { label: "Actions", className: "text-right" },
];

export const UsersTable = () => {
  return (
    <DashboardTable header={<UsersTableHeader />} footer={<TablePagination />} columns={columns}>
      {USERS.map((user) => (
        <UsersTableRow key={user.id} user={user} />
      ))}
    </DashboardTable>
  );
};
