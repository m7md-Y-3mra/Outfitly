"use server";

import { Activity, Heart, ShoppingBag, Users } from "lucide-react";
import userService from "../user/user.service";
import { formatCount, formatEngagementRate } from "./utils/number.utils";
import { getOutfitsCount } from "../outfit/outfit.service";
import { toChartData } from "./utils/charts.utils";

export const getUsersForStats = async () => {
  const numberOfUsers = await userService.getUsersCount();
  return {
    label: "Total Users",
    value: formatCount(numberOfUsers),
    icon: Users,
    iconBg: "bg-blue-100 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
  };
};

export const getOutfitsForStats = async () => {
  const numberOfOutfits = await getOutfitsCount();

  return {
    label: "Total Outfits",
    value: formatCount(numberOfOutfits),
    icon: ShoppingBag,
    iconBg: "bg-orange-100 dark:bg-orange-900/20",
    iconColor: "text-orange-600 dark:text-orange-400",
  };
};

export const getEngagmentForStats = async () => {
  const value = getEngagmentPercentage();

  return {
    label: "Engagement Rate",
    value,
    icon: Heart,
    iconBg: "bg-pink-100 dark:bg-pink-900/20",
    iconColor: "text-pink-600 dark:text-pink-400",
  };
};

export const getActivesForStats = async () => {
  const value = userService.getActiveUsersCount();
  return {
    label: "Active Today",
    value,
    icon: Activity,
    iconBg: "bg-emerald-100 dark:bg-emerald-900/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  };
};

export const getEngagmentPercentage = async () => {
  const totalUsers = await userService.getUsersCount();
  const totalActives = await userService.getActiveUsersCount();
  const percentage = formatEngagementRate(totalActives, totalUsers);
  return percentage;
};

export const getUsersForChart = async () => {
  const usersByMonthFromDB = await userService.getUsersByMonth();
  const chartData = toChartData(usersByMonthFromDB);
  return chartData;
};
