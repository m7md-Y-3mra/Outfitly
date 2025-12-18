import { Clock, Share2 } from "lucide-react";

export const kpiStats = [
  {
    label: "Avg. Session",
    value: "8m 32s",
    progress: 68,
    icon: Clock,
    iconBg: "bg-purple-100 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400",
    progressColor:
      "bg-purple-100 dark:bg-purple-900/20 [&>*]:bg-purple-600 dark:[&>*]:bg-purple-400",
  },
  {
    label: "Share Rate",
    value: "42.3%",
    progress: 42.3,
    icon: Share2,
    iconBg: "bg-green-100 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400",
    progressColor: "bg-green-100 dark:bg-green-900/20 [&>*]:bg-green-600 dark:[&>*]:bg-green-400",
  },
];
