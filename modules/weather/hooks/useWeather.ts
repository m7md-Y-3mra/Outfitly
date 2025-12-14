"use client";

import { useState, useEffect } from "react";
import { WeatherData, Outfit, WardrobeItem } from "../weather.types";
import { mockWeather, timeBasedOutfits, suitableItems } from "../weather.constants";

interface UseWeatherReturn {
  weather: WeatherData;
  outfits: Outfit[];
  items: WardrobeItem[];
  handleScroll: (direction: "left" | "right") => void;
}

export const useWeather = (): UseWeatherReturn => {
  const [weather, setWeather] = useState<WeatherData>(mockWeather);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Scroll handler for wardrobe items
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

  // Fetch weather from Open-Meteo
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`,
          );
          if (!res.ok) throw new Error("Failed to fetch weather");

          const data = await res.json();

          // Open-Meteo returns temperature in Celsius and windspeed in km/h
          const current = data.current_weather;

          const newWeather: WeatherData = {
            location: `Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`,
            temperature: Math.round(current.temperature * 1.8 + 32), // Convert to °F
            temperatureCelsius: current.temperature,
            condition: "Cloudy", // Open-Meteo doesn’t provide condition strings, you can map from weathercode if needed
            feelsLike: Math.round(current.temperature * 1.8 + 32), // Approx
            humidity: 50, // Open-Meteo doesn’t provide, fallback to default
            windSpeed: current.windspeed,
            uvIndex: 5, // Fallback value
            icon: "cloudy", // Fallback, can map using weathercode
          };

          setWeather(newWeather);
        } catch (err) {
          console.error("Weather fetch failed, using default", err);
          setWeather(mockWeather);
        }
      },
      (err) => {
        console.warn("Location denied, using mock weather");
        setWeather(mockWeather);
      },
    );
  }, []);

  return { weather, outfits: timeBasedOutfits, items: suitableItems, handleScroll };
};
