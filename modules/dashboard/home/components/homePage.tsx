import { connection } from "next/server";
import { DashboardStats } from "@/modules/dashboard/home/components/stats/dashboard-stats";
import { UserGrowthChart } from "@/modules/dashboard/home/components/charts/user-growth-chart";
import { ItemsAddedThisWeekChart } from "@/modules/dashboard/home/components/charts/outfit-engagement-chart";
import { DashboardKPICards } from "@/modules/dashboard/home/components/kpi/kpi-stats";
import { ItemCategoriesChart } from "@/modules/dashboard/home/components/charts/item-categories-chart";
import {
  getUsersForChart,
  getCatsChartData,
  getWardrobChartData,
  getItemsKPI,
  getOutfitKPI,
} from "@/modules/dashboard/dashboard.service";

const HomePage = async () => {
  await connection();

  const [userGrowthData, categoriesData, wardrobeData, itemsKPI, outfitKPI] = await Promise.all([
    getUsersForChart(),
    getCatsChartData(),
    getWardrobChartData(),
    getItemsKPI(),
    getOutfitKPI(),
  ]);

  const kpiStats = [itemsKPI, outfitKPI];

  return (
    <div className="pt-8 space-y-8">
      {/* Top Stats Section */}
      <DashboardStats />

      {/* Middle Section: User Growth & Item Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-full min-h-[450px]">
          <UserGrowthChart data={userGrowthData} />
        </div>
        <div className="lg:col-span-1 h-full min-h-[450px]">
          <ItemCategoriesChart data={categoriesData} />
        </div>
      </div>

      {/* Bottom Section: Engagement & KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-full min-h-[400px]">
          <ItemsAddedThisWeekChart data={wardrobeData} />
        </div>
        <div className="lg:col-span-1 h-full">
          <DashboardKPICards stats={kpiStats} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
