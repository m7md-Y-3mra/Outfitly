"use client";

import { useState, useEffect } from "react";
import { WeatherData, Outfit, WardrobeItem } from "../weather.types";
import { mockWeather, timeBasedOutfits, suitableItems } from "../weather.constants";
import { WeatherService } from "../weather.service";
import { validateWeatherData } from "../weather.validation";

interface UseWeatherReturn {
  weather: WeatherData;
  handleScroll: (direction: "left" | "right") => void;
}

// Enhanced: Map weather to season primarily based on temperature (°F), with condition as tiebreaker
export const getSeasonFromWeather = (weather: WeatherData): string => {
  const temp = weather.temperature;
  const condition = weather.condition.toLowerCase();

  // Validate temperature
  if (typeof temp !== "number" || isNaN(temp)) {
    return "autumn"; // Default fallback
  }

  // Temperature-based mapping
  if (temp > 75) {
    return "summer"; // Hot
  } else if (temp >= 60) {
    // Mild range: Use condition to distinguish autumn vs. summer edge
    return condition === "sunny" ? "summer" : "autumn";
  } else if (temp >= 45) {
    // Cooler range: Use condition for spring vs. autumn edge
    return condition === "rainy" || condition === "drizzle" ? "spring" : "autumn";
  } else {
    // Cold: Winter, but check for snowy
    return condition === "snowy" ? "winter" : "spring";
  }
};

export const useWeather = (): UseWeatherReturn => {
  const [weather, setWeather] = useState<WeatherData>(mockWeather);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Scroll handler for wardrobe items (unchanged)
  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("items-scroll");
    if (container) {
      const scrollAmount = 300;
      const newPosition =
        direction === "right" ? scrollPosition + scrollAmount : scrollPosition - scrollAmount;
      container.scrollTo({ left: newPosition, behavior: "smooth" });
      setScrollPosition(newPosition);
    }
  };

  // Fetch weather using the service and validate response
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const fetchedWeather = await WeatherService.fetchCurrentWeather();
        if (validateWeatherData(fetchedWeather)) {
          setWeather(fetchedWeather);
        } else {
          console.warn("Invalid weather data, using mock");
          setWeather(mockWeather);
        }
      } catch (error) {
        console.error("Weather fetch failed, using mock", error);
        setWeather(mockWeather);
      }
    };

    fetchWeather();
  }, []);

  // Filter outfits and items based on weather season


  return { weather, handleScroll };
};
