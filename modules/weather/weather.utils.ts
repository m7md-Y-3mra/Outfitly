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

export const getSeasonFromWeather = (weather: WeatherData): Season => {
  const { temperature, condition } = weather;
  const normalizedCondition = condition.toLowerCase();

  if (typeof temperature !== "number" || Number.isNaN(temperature)) {
    return "fall";
  }

  if (temperature > 75) {
    return "summer";
  }

  if (temperature >= 60) {
    return normalizedCondition === "sunny" ? "summer" : "fall";
  }

  if (temperature >= 45) {
    return normalizedCondition === "rainy" || normalizedCondition === "drizzle"
      ? "spring"
      : "fall";
  }

  return normalizedCondition === "snowy" ? "winter" : "spring";
};
