import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { fetchCurrentWeather } from "../weather.service";
import { useProfile } from "../../profile/hooks/useProfile";
import { getSeasonFromWeather } from "../weather.utils";
import type { WeatherData } from "../weather.types";

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<Error | null>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);

  const { outfits: userOutfits, items: userItems } = useProfile();

  // Fetch weather on mount
  useEffect(() => {
    let isMounted = true;

    const loadWeather = async () => {
      setWeatherLoading(true);
      setWeatherError(null);

      try {
        const data = await fetchCurrentWeather();
        if (isMounted) setWeather(data);
      } catch (err) {
        if (isMounted) {
          setWeatherError(err instanceof Error ? err : new Error("Unknown weather error"));
          setWeather(null);
        }
      } finally {
        if (isMounted) setWeatherLoading(false);
      }
    };

    loadWeather();

    return () => {
      isMounted = false;
    };
  }, []);

  // Determine season based on fetched weather
  const season = useMemo(() => {
    if (!weather) return null;
    const derivedSeason = getSeasonFromWeather(weather);
    return derivedSeason || "All-Year"; // fallback if season cannot be determined
  }, [weather]);

  // Weather status
  const weatherStatus = useMemo<"loading" | "ready" | "error">(() => {
    if (weatherLoading) return "loading";
    if (weatherError) return "error";
    return "ready";
  }, [weatherLoading, weatherError]);

  // Filter outfits based on season
  const filteredOutfits = useMemo(() => {
    if (weatherStatus !== "ready" || !season) return [];

    return (
      userOutfits?.filter((outfit) => {
        if (!outfit.season) return false;
        const outfitSeasons = outfit.season
          .toLowerCase()
          .split(/[\/,]/)
          .map((s) => s.trim());
        return outfitSeasons.includes(season.toLowerCase()) || outfitSeasons.includes("all-year");
      }) || []
    );
  }, [userOutfits, season, weatherStatus]);

  // Filter wardrobe items based on season
  const filteredItems = useMemo(() => {
    if (weatherStatus !== "ready" || !season) return [];

    return (
      userItems?.filter((item) => {
        if (!item.season) return false;
        const itemSeasons = item.season
          .toLowerCase()
          .split(/[\/,]/)
          .map((s) => s.trim());
        return itemSeasons.includes(season.toLowerCase()) || itemSeasons.includes("all-year");
      }) || []
    );
  }, [userItems, season, weatherStatus]);

  // Scroll handler for wardrobe carousel
  const handleScroll = useCallback((direction: "left" | "right") => {
    if (!itemsContainerRef.current) return;

    const scrollAmount = 300;
    itemsContainerRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }, []);

  return {
    weather,
    season,
    weatherLoading,
    weatherError,
    weatherStatus,
    filteredOutfits,
    filteredItems,
    handleScroll,
    itemsContainerRef,
  };
};
