// DashboardKPICards.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Layers, TrendingUp } from "lucide-react";

const iconMap = {
  Layers,
  TrendingUp,
} as const;

type IconName = keyof typeof iconMap;

interface KPIStat {
  label: string;
  value: string;
  progress?: string;
  iconName: IconName;
  iconBg: string;
  iconColor: string;
  progressColor?: string;
}

interface DashboardKPICardsProps {
  stats: KPIStat[];
}

export function DashboardKPICards({ stats }: DashboardKPICardsProps) {
  return (
    <div className="flex flex-col gap-2 h-full justify-start">
      {stats.map((stat) => {
        const Icon = iconMap[stat.iconName];
        const showProgress = stat.progress !== undefined;
        const progressValue = stat.progress ? parseFloat(stat.progress) : 0;

        return (
          <Card
            key={stat.label}
            className="flex flex-col p-4 shadow-sm border-border/40 rounded-2xl overflow-hidden h-fit justify-center"
          >
            <div className={`flex items-center gap-3 ${showProgress ? "mb-3" : ""}`}>
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

            {showProgress && (
              <div className="w-full">
                <Progress
                  value={progressValue}
                  className={`h-2 w-full ${stat.progressColor ?? ""}`}
                />
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
