"use client";
import React from "react";
import { columns, OUTFITS } from "./outfits-table.constants";
import { OutfitsTableHeader } from "./outfits-table-header";
import { OutfitsTableRow } from "./outfits-table-row";
import TablePagination from "@/modules/dashboard/tablePagination";
import { DashboardTable } from "@/modules/dashboard/components/dashboard-table";

export const OutfitsTable = () => {
  return (
    <DashboardTable header={<OutfitsTableHeader />} footer={<TablePagination />} columns={columns}>
      {OUTFITS.map((outfit) => (
        <OutfitsTableRow key={outfit.id} outfit={outfit} />
      ))}
    </DashboardTable>
  );
};
