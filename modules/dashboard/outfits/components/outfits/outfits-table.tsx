"use client";
import React from "react";
import { columns } from "./outfits-table.constants";
import { OutfitsTableHeader } from "./outfits-table-header";
import { OutfitsTableRow } from "./outfits-table-row";
import TablePagination from "@/modules/dashboard/tablePagination";
import { DashboardTable } from "@/modules/dashboard/components/dashboard-table";
import { Outfit } from "@/modules/dashboard/outfits/types/outfits.types";
import { IMetaPagination } from "@/@types/database.type";

interface OutfitsTableProps {
  outfits: Outfit[];
  meta?: IMetaPagination;
}

export const OutfitsTable = ({ outfits, meta }: OutfitsTableProps) => {
  return (
    <DashboardTable
      header={<OutfitsTableHeader />}
      footer={<TablePagination meta={meta} basePath="/dashboard/outfits" />}
      columns={columns}
    >
      {outfits.map((outfit) => (
        <OutfitsTableRow key={outfit.outfitId} outfit={outfit} />
      ))}
    </DashboardTable>
  );
};
