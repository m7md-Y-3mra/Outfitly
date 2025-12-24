"use server";

import { Activity, Heart, Layers, ShoppingBag, TrendingUp, Users } from "lucide-react";
import userService from "../user/user.service";
import { formatCount, formatRate } from "./utils/number.utils";
import { getOutfitsCount, getUsedItemsService } from "../outfit/outfit.service";
import { toChartData } from "./utils/charts.utils";
import {
  findItemsInLastWeekService,
  getCatsByIdsService,
  getCatsCountService,
  getCountService,
} from "../wardrobe/wardrobe.service";
import { dayNames } from "./home/constants";

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
  const percentage = formatRate(totalActives, totalUsers);
  return percentage;
};

export const getUsersForChart = async () => {
  const usersByMonthFromDB = await userService.getUsersByMonth();
  const chartData = toChartData(usersByMonthFromDB);
  return chartData;
};

export const getCatsChartData = async () => {
  const groupedCats = await getCatsCountService();
  const ids = groupedCats.map((c) => c.categoryId);
  const catsById = await getCatsByIdsService(ids);
  const catMap = new Map(catsById.map((c) => [c.id, c.name]));
  const chartData = groupedCats.map((gc) => ({
    category: catMap.get(gc.categoryId) ?? "Unknown",
    count: gc._count._all,
  }));
  return chartData;
};

export const getWardrobChartData = async () => {
  const items = await findItemsInLastWeekService();

  const from = new Date();
  from.setHours(0, 0, 0, 0);
  from.setDate(from.getDate() - 6);
  const counts = new Map<string, number>();

  for (const it of items) {
    const day = dayNames[new Date(it.addedAt).getDay()];
    counts.set(day, (counts.get(day) ?? 0) + 1);
  }

  const days: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(from);
    d.setDate(from.getDate() + i);
    days.push(dayNames[d.getDay()]);
  }

  const chartData = days.map((day) => ({
    day,
    items: counts.get(day) ?? 0,
  }));
  return chartData;
};

export const getItemsKPI = async () => {
  const itemsCounts = await getCountService();
  const outfitsCount = await getOutfitsCount();
  const value = String(Number(itemsCounts/outfitsCount).toFixed(1)) + " " + "items";

  return {
      label: "Avgerege Items For Outfits",
      value, 
      icon: Layers,
      iconBg: "bg-blue-100 dark:bg-blue-900/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      progressColor: "bg-blue-100 dark:bg-blue-900/20 [&>*]:bg-blue-600 dark:[&>*]:bg-blue-400",
  }
}

export const getOutfitKPI = async () => {
  const uniqueUsedItems = await getUsedItemsService();
  const itemsCount = await getCountService();

  const value = formatRate(uniqueUsedItems.length, itemsCount);
  const progress = ((uniqueUsedItems.length/ itemsCount) * 100).toFixed(1);
  
  return   {
      label: "Outfit Usage Rate",
      value,
      progress,
      icon: TrendingUp,
      iconBg: "bg-cyan-100 dark:bg-cyan-900/20",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      progressColor: "bg-cyan-100 dark:bg-cyan-900/20 [&>*]:bg-cyan-600 dark:[&>*]:bg-cyan-400",
    }
}
