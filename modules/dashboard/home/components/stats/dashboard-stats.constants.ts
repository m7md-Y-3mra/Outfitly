import { Users, ShoppingBag, Heart, Activity } from "lucide-react";

export const stats = [
  {
    label: "Total Users",
    value: "12,543",
    icon: Users,
    iconBg: "bg-blue-100 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    label: "Total Outfits",
    value: "48,392",
    icon: ShoppingBag,
    iconBg: "bg-orange-100 dark:bg-orange-900/20",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    label: "Engagement Rate",
    value: "67.8%",
    icon: Heart,
    iconBg: "bg-pink-100 dark:bg-pink-900/20",
    iconColor: "text-pink-600 dark:text-pink-400",
  },
  {
    label: "Active Today",
    value: "3,842",
    icon: Activity,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
];
