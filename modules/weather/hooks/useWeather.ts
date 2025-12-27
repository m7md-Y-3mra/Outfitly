import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { fetchCurrentWeather } from "../weather.service";
import { useProfile } from "../../profile/hooks/useProfile";
import { getSeasonFromWeather } from "../weather.utils";
import type { WeatherData } from "../weather.types";

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState<Error>(new Error());
  const itemsContainerRef = useRef<HTMLDivElement>(null);
  const { outfits: userOutfits, items: userItems, profileLoading } = useProfile();

  
  // Fetch weather on mount
  useEffect(() => {
    let isMounted = true;

    const loadWeather = async () => {
      try {
        const data = await fetchCurrentWeather();
        if (isMounted) setWeather(data);
      } catch {
        if (isMounted) {
          setWeatherError(new Error("Unknown weather error occurred"));
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
  const season = useMemo(() => (weather ? getSeasonFromWeather(weather) : null), [weather]);
  const weatherStatus = useMemo<"loading" | "ready" | "error">(() => {
    if (weatherLoading || profileLoading) return "loading";
    if (weatherError || !season) return "error";
    return "ready";
  }, [weatherLoading, profileLoading, weatherError, season]);
  // Filter outfits based on season
  const filteredOutfits = useMemo(() => {
    console.log(userOutfits)
    if (!season) return [];
    return (
      userOutfits?.filter((outfit) => {
        if (!outfit.season) return false;
        const outfitSeasons = outfit.season
          .toLowerCase()
          .split(/[\/,]/)
          .map((s) => s.trim());
        console.log(outfitSeasons, '0sssss')  
        return outfitSeasons.includes(season.toLowerCase()) || outfitSeasons.includes("all-year");
      }) || []
    );
  }, [userOutfits, season]);

  // Filter wardrobe items based on season
  const filteredItems = useMemo(() => {
    if (!season) return [];
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
  }, [userItems, season]);

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
    profileLoading,
    filteredOutfits: weatherStatus === "ready" ? filteredOutfits : [],
    filteredItems: weatherStatus === "ready" ? filteredItems : [],
    handleScroll,
    itemsContainerRef,
  };
};
