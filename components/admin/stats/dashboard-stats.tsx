"use client";

import { Users, ShoppingBag, Heart, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";

const stats = [
  {
    label: "Total Users",
    value: "12,543",
    change: "+12.5%",
    icon: Users,
    iconBg: "bg-blue-100 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    label: "Total Outfits",
    value: "48,392",
    change: "+18.2%",
    icon: ShoppingBag,
    iconBg: "bg-orange-100 dark:bg-orange-900/20",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    label: "Engagement Rate",
    value: "67.8%",
    change: "+8.3%",
    icon: Heart,
    iconBg: "bg-pink-100 dark:bg-pink-900/20",
    iconColor: "text-pink-600 dark:text-pink-400",
  },
  {
    label: "Active Today",
    value: "3,842",
    change: "+5.7%",
    icon: Activity,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
];

export function DashboardStats() {
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
              <span className="text-sm font-semibold text-green-600 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded-full">
                {stat.change}
              </span>
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
