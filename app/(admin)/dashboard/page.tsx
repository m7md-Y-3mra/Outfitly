import React from "react";
import { UserGrowthChart } from "@/components/admin/charts/user-growth-chart";
import { ItemCategoriesChart } from "@/components/admin/charts/item-categories-chart";

const DashboardPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        <div className="h-full lg:col-span-2">
          <UserGrowthChart />
        </div>
        <div className="h-full h-full lg:col-span-1">
          <ItemCategoriesChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
