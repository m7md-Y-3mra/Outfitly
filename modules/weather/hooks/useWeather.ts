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
  const { outfits: userOutfits, items: userItems, loading: profileLoading } = useProfile();

  useEffect(() => {
      let isMounted = true;

      const loadWeather = async () => {
        try {
          const data = await fetchCurrentWeather();
          if (isMounted) setWeather(data);
        } catch (error) {
          if (isMounted) {
            setWeatherError(error as Error);
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
  const season = useMemo(() => (weather ? getSeasonFromWeather(weather) : "fall"), [weather]);

  const filteredOutfits = useMemo(
    () => userOutfits?.filter((outfit) => outfit.season === season) || [],
    [userOutfits, season],
  );

  const filteredItems = useMemo(() => {
    const currentSeason = season.toLowerCase();
    return (
      userItems?.filter((item) => {
        const itemSeason = item.season?.toLowerCase();
        return (
          itemSeason === currentSeason ||
          itemSeason === "all-year" ||
          itemSeason?.includes(currentSeason)
        );
      }) || []
    );
  }, [userItems, season]);

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
    weatherLoading,  
    weatherError,
    profileLoading,
    season,
    filteredOutfits,
    filteredItems,
    handleScroll,
    itemsContainerRef,
  };
};
