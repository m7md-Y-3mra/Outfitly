// kpi-stats.constants.ts
import { Layers, TrendingUp } from "lucide-react";

export const kpiStats = [
  {
    label: "Avgerege Items For Outfits",
    value: "4.6 items", 
    icon: Layers,
    iconBg: "bg-blue-100 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    progressColor: "bg-blue-100 dark:bg-blue-900/20 [&>*]:bg-blue-600 dark:[&>*]:bg-blue-400",
  },
  {
    label: "Outfit Usage Rate",
    value: "42.3%",
    progress: 42.3,
    icon: TrendingUp,
    iconBg: "bg-cyan-100 dark:bg-cyan-900/20",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    progressColor: "bg-cyan-100 dark:bg-cyan-900/20 [&>*]:bg-cyan-600 dark:[&>*]:bg-cyan-400",
  },
];
