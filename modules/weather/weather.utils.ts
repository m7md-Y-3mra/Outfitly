import { Sun, Cloud, CloudRain, Snowflake, CloudDrizzle, LucideIcon } from "lucide-react";

export const getWeatherIcon = (condition: string): LucideIcon => {
  switch (condition.toLowerCase()) {
    case "sunny":
      return Sun;
    case "partly cloudy":
      return Cloud;
    case "cloudy":
      return Cloud;
    case "rainy":
      return CloudRain;
    case "drizzle":
      return CloudDrizzle;
    case "snowy":
      return Snowflake;
    default:
      return Sun;
  }
};
