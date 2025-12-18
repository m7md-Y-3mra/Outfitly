import { DashboardStats } from "@/modules/dashboard/home/components/stats/dashboard-stats";
import { UserGrowthChart } from "@/modules/dashboard/home/components/charts/user-growth-chart";
import { OutfitEngagementChart } from "@/modules/dashboard/home/components/charts/outfit-engagement-chart";
import { DashboardKPICards } from "@/modules/dashboard/home/components/kpi/kpi-stats";
import { ItemCategoriesChart } from "@/modules/dashboard/home/components/charts/item-categories-chart";

const HomePage = () => {
  return (
    <div className="pt-8 space-y-8">
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

export default HomePage;
