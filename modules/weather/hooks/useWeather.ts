"use client";
import { useState } from "react";
import { mockWeather, timeBasedOutfits, suitableItems } from "../weather.constants";

export const useWeather = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

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

  return { weather: mockWeather, outfits: timeBasedOutfits, items: suitableItems, handleScroll };
};
