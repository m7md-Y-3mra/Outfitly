import React from "react";
import { UserGrowthChart } from "@/components/admin/charts/user-growth-chart";
import { ItemCategoriesChart } from "@/components/admin/charts/item-categories-chart";
import { OutfitEngagementChart } from "@/components/admin/charts/outfit-engagement-chart";
import { DashboardKPICards } from "@/components/admin/kpi/kpi-stats";
import { DashboardStats } from "@/components/admin/stats/dashboard-stats";

const DashboardPage = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Top Stats Section */}
      <DashboardStats />

      {/* Middle Section: User Growth & Item Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-full min-h-[450px]">
          <UserGrowthChart />
        </div>
        <div className="lg:col-span-1 h-full min-h-[450px]">
          <ItemCategoriesChart />
        </div>
      </div>

      {/* Bottom Section: Engagement & KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-full min-h-[400px]">
          <OutfitEngagementChart />
        </div>
        <div className="lg:col-span-1 h-full">
          <DashboardKPICards />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
