"use client";

import { useState, useEffect } from "react";
import { WeatherData, Outfit, WardrobeItem } from "../weather.types";
import { mockWeather, timeBasedOutfits, suitableItems } from "../weather.constants";
import { WeatherService } from "../weather.service";
import { validateWeatherData } from "../weather.validation";

interface UseWeatherReturn {
  weather: WeatherData;
  outfits: Outfit[];
  items: WardrobeItem[];
  handleScroll: (direction: "left" | "right") => void;
}

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

  return { weather, outfits: timeBasedOutfits, items: suitableItems, handleScroll };
};