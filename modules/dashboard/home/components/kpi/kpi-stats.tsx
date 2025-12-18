import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { kpiStats } from "./kpi-stats.constants";

export function DashboardKPICards() {
  return (
    <div className="flex flex-col gap-2 h-full justify-start">
      {kpiStats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="flex flex-col p-4 shadow-sm border-border/40 rounded-2xl overflow-hidden h-fit justify-center"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${stat.iconBg}`}
              >
                <Icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                <span className="text-2xl font-bold leading-none">{stat.value}</span>
              </div>
            </div>
            <div className="w-full">
              <Progress value={stat.progress} className={`h-2 w-full ${stat.progressColor}`} />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
