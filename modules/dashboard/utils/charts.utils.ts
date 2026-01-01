import { MONTH_NAMES } from "../home/constants";
import { MonthlyUserFromDB } from "../home/types";

export const toChartData = (monthlyUserFromDB: MonthlyUserFromDB[]) => {
  return monthlyUserFromDB.map((row) => {
    const monthIndex = Number(row.month) - 1;

    return {
      month: MONTH_NAMES[monthIndex] ?? "Unknown",
      users: Number(row.users),
    };
  });
};
