"use server";

import { Activity, Heart, ShoppingBag, Users } from "lucide-react";
import userService from "../user/user.service";
import { formatCompact, formatCount, formatRate } from "./utils/number.utils";
import {
  getOutfitsCount,
  getOutfitsForDashboardService,
  getOutfitsForDashboardServicePaginated,
  getUsedItemsService,
  getPrivateOutfitsCountService,
  getTotalLikesCountService,
} from "../outfit/outfit.service";
import { toChartData } from "./utils/charts.utils";
import {
  findItemsInLastWeekService,
  getCatsByIdsService,
  getCatsCountService,
  getCountService,
} from "../wardrobe/wardrobe.service";
import { dayNames } from "./home/constants";
import { toStatus } from "./utils/outfits.util";

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
  const value = String(Number(itemsCounts / outfitsCount).toFixed(1)) + " " + "items";

  return {
    label: "Avgerege Items For Outfits",
    value,
    iconName: "Layers" as const,
    iconBg: "bg-blue-100 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    progressColor: "bg-blue-100 dark:bg-blue-900/20 [&>*]:bg-blue-600 dark:[&>*]:bg-blue-400",
  };
};

export const getOutfitKPI = async () => {
  const uniqueUsedItems = await getUsedItemsService();
  const itemsCount = await getCountService();

  const value = formatRate(uniqueUsedItems.length, itemsCount);
  const progress = ((uniqueUsedItems.length / itemsCount) * 100).toFixed(1);

  return {
    label: "Outfit Usage Rate",
    value,
    progress,
    iconName: "TrendingUp" as const,
    iconBg: "bg-cyan-100 dark:bg-cyan-900/20",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    progressColor: "bg-cyan-100 dark:bg-cyan-900/20 [&>*]:bg-cyan-600 dark:[&>*]:bg-cyan-400",
  };
};

export const getUsersForTables = async () => {
  const usersFromDB = await userService.getUsersWithOutfitsService();

  return usersFromDB.map((u) => ({
    id: u.id,
    name: u.fullName ?? "—",
    email: u.email,
    outfits: u._count.outfits,
    status: u.isActive ? "Active" : "Inactive",
    joined: u.createdAt.toISOString().slice(0, 10),
  }));
};

export const getUsersForTablesPaginated = async (page: number = 1, limit: number = 10) => {
  const { data: usersFromDB, meta } = await userService.getUsersWithOutfitsPaginated(page, limit);

  const users = usersFromDB.map((u) => ({
    id: u.id,
    name: u.fullName ?? "—",
    email: u.email,
    outfits: u._count.outfits,
    status: u.isActive ? "Active" : "Inactive",
    joined: u.createdAt.toISOString().slice(0, 10),
  }));

  return { users, meta };
};

export const getOutfitForDashboard = async () => {
  const outfits = await getOutfitsForDashboardService();

  return outfits.map((o, idx) => ({
    id: idx + 1,
    outfitId: o.id,
    name: o.name,
    creator: o.user.fullName ?? "—",
    likes: formatCompact(o._count.likedBy),
    date: o.createdAt.toISOString().slice(0, 10),
    status: toStatus(o.visibility),
  }));
};

export const getOutfitForDashboardPaginated = async (page: number = 1, limit: number = 10) => {
  const { data: outfits, meta } = await getOutfitsForDashboardServicePaginated(page, limit);

  const mappedOutfits = outfits.map((o, idx) => ({
    id: (page - 1) * limit + idx + 1,
    outfitId: o.id,
    name: o.name,
    creator: o.user.fullName ?? "—",
    likes: formatCompact(o._count.likedBy),
    date: o.createdAt.toISOString().slice(0, 10),
    status: toStatus(o.visibility),
  }));

  return { outfits: mappedOutfits, meta };
};

export const getOutfitPageStats = async () => {
  const [totalOutfits, pendingCount, totalLikes] = await Promise.all([
    getOutfitsCount(),
    getPrivateOutfitsCountService(),
    getTotalLikesCountService(),
  ]);

  return {
    totalOutfits: formatCount(totalOutfits),
    pendingCount: formatCount(pendingCount),
    totalLikes: formatCompact(totalLikes),
  };
};
