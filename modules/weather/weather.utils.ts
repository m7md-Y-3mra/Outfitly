import { Sun, Cloud, CloudRain, Snowflake, CloudDrizzle } from "lucide-react";

export const getWeatherIcon = (condition: string) => {
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
