"use client";
import React from "react";
import { UsersTableHeader } from "./users-table-header";
import { UsersTableRow } from "./users-table-row";
import TablePagination from "@/modules/dashboard/tablePagination";
import { DashboardTable } from "@/modules/dashboard/components/dashboard-table";
import { User } from "@/modules/dashboard/users/types/users.types";
import { IMetaPagination } from "@/@types/database.type";

const columns = [
  { label: "User" },
  { label: "Email" },
  { label: "Outfits" },
  { label: "Status" },
  { label: "Joined" },
  { label: "Actions", className: "text-right" },
];

interface UsersTableProps {
  users: User[];
  meta?: IMetaPagination;
}

export const UsersTable = ({ users, meta }: UsersTableProps) => {
  return (
    <DashboardTable
      header={<UsersTableHeader />}
      footer={<TablePagination meta={meta} basePath="/dashboard/users" />}
      columns={columns}
    >
      {users.map((user) => (
        <UsersTableRow key={user.id} user={user} />
      ))}
    </DashboardTable>
  );
};
