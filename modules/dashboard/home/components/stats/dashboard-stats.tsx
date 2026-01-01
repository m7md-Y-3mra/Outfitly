import { Card } from "@/components/ui/card";
import {
  getUsersForStats,
  getOutfitsForStats,
  getEngagmentForStats,
  getActivesForStats,
} from "@/modules/dashboard/dashboard.service";

export async function DashboardStats() {
  const [usersStats, outfitsStats, engagementStats, activesStats] = await Promise.all([
    getUsersForStats(),
    getOutfitsForStats(),
    getEngagmentForStats(),
    getActivesForStats(),
  ]);

  const stats = [usersStats, outfitsStats, engagementStats, activesStats];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="p-6 shadow-sm border-border/40 rounded-2xl overflow-hidden flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${stat.iconBg}`}
              >
                <Icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
