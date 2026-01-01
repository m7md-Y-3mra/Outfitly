import { Sun, Cloud, CloudRain, Snowflake, CloudDrizzle, LucideIcon } from "lucide-react";
import type { WeatherData } from "./weather.types";

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

export type Season = "summer" | "fall" | "winter" | "spring";

export const getSeasonFromWeather = (weather: WeatherData): string => {
  const tempF = weather.temperature; // using Fahrenheit

  if (tempF <= 50) return "winter";
  if (tempF <= 65) return "fall";
  if (tempF <= 85) return "spring";
  return "summer";
};
