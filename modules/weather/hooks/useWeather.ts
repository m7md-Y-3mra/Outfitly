"use client";

import { useState, useEffect } from "react";
import type { WeatherData } from "../weather.types";
import { WeatherService } from "../weather.service";

interface UseWeatherReturn {
  weather: WeatherData | null;
  loading: boolean;
}

export const useWeather = (): UseWeatherReturn => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchWeather = async () => {
      try {
        const data = await WeatherService.fetchCurrentWeather();
        if (!data) throw new Error("Invalid weather response");

        if (isMounted) setWeather(data);
      } catch (error) {
        console.error("Weather fetch failed", error);
        if (isMounted) setWeather(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchWeather();

    return () => {
      isMounted = false;
    };
  }, []);

  return { weather, loading };
};
