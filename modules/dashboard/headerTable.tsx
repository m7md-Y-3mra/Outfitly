"use client";
import React from "react";

interface HeaderTableProps {
  title: string;
  description: string;
}

const HeaderTable = ({ title, description }: HeaderTableProps) => {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h1>
      <p className="text-muted-foreground text-sm mt-1">{description}</p>
    </div>
  );
};

export default HeaderTable;
