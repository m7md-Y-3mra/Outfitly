import { z } from "zod";
import { WeatherData } from "./weather.types";

export const weatherDataSchema = z.object({
  location: z.string(),
  temperature: z.number(),
  temperatureCelsius: z.number(),
  condition: z.string(),
  feelsLike: z.number(),
  humidity: z.number(),
  windSpeed: z.number(),
  uvIndex: z.number(),
  icon: z.string(),
});

// Optional: Type guard using Zod
export const validateWeatherData = (data: unknown): data is WeatherData => {
  return weatherDataSchema.safeParse(data).success;
};
