"use client";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import CustomButton from "../../components/custom-button";
import { PageHeader } from "../../components/page-header";
import { useWeather } from "./hooks/useWeather";
import { WeatherWidget } from "./components/weather-widget/weatherWidget";
import { OutfitCard } from "./components/outfit-card/outfitCard";
import { WardrobeItemCard } from "./components/wardrobe-item-card/wardrobeItemCard";
import { useProfile } from "../profile/hooks/useProfile";
import { useMemo } from "react";
import { getSeasonFromWeather } from "./weather.utils";

export default function WeatherPage() {
  const { weather, loading: weatherLoading } = useWeather();
  const { outfits: userOutfits, items: userItems, loading: profileLoading } = useProfile();

  const season = useMemo(() => (weather ? getSeasonFromWeather(weather) : "fall"), [weather]);

  const filteredOutfits = useMemo(() => {
    if (!userOutfits) return [];
    return userOutfits.filter((outfit) => outfit.season === season);
  }, [userOutfits, season]);

  const filteredItems = useMemo(() => {
    if (!userItems) return [];
    return userItems.filter((item) => {
      const itemSeason = item.season?.toLowerCase(); // Normalize to lowercase (e.g., "SUMMER" -> "summer")
      const currentSeason = season.toLowerCase(); // Normalize season too
      return (
        itemSeason === currentSeason || // Exact match
        itemSeason === "all-year" || // Special case for all-year
        itemSeason?.includes(currentSeason) // Comma-separated (e.g., "spring,summer" includes "summer")
      );
    });
  }, [userItems, season]);

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("items-scroll");
    if (!container) return;

    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };
  return (
    <div className="bg-background">
      <main className="pt-20 pb-16">
        <PageHeader
          title="Today's Weather Outfits"
          subtitle="Dress perfectly for the weather conditions"
        />
        <div className="container mx-auto px-4 max-w-7xl mt-12">
          {weatherLoading ? (
            <p>...loading weather</p>
          ) : (
            <WeatherWidget weather={weather} loading={weatherLoading} />
          )}

          {/* Outfits Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.6, delay: 0.3 },
            }}
          >
            <div className="flex items-center justify-between mt-12 mb-6">
              <h2 className="mb-8 text-2xl font-extrabold tracking-wide bg-gradient-to-r from-[var(--outfitly-gradient-start)] via-[var(--outfitly-gradient-mid)] to-[var(--outfitly-gradient-end)] bg-clip-text text-transparent">
                Perfect outfits for today ({season} weather):
              </h2>
            </div>

            {profileLoading ? (
              <p>Loading your outfits...</p> // <-- Add loading state
            ) : filteredOutfits.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredOutfits.map((outfit, index) => (
                  <OutfitCard key={outfit.id || index} outfit={outfit} index={index} />
                ))}
              </div>
            ) : (
              <p>No outfits match this weather. Try adding more to your profile!</p> // <-- Fallback
            )}
          </motion.div>

          {/* Wardrobe Items Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.5 } }}
          >
            <div className="flex items-center justify-between mt-12 mb-6">
              <h2 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-[var(--outfitly-gradient-start)] via-[var(--outfitly-gradient-mid)] to-[var(--outfitly-gradient-end)] bg-clip-text text-transparent">
                Your wardrobe items for this weather:
              </h2>
              <CustomButton variant="link" className="flex items-center gap-2">
                See All
                <ChevronRight size={16} />
              </CustomButton>
            </div>
            {profileLoading ? (
              <p>Loading your wardrobe...</p> // <-- Add loading state
            ) : filteredItems.length > 0 ? (
              <div className="relative">
                <div
                  id="items-scroll"
                  className="flex overflow-x-auto space-x-4 scroll-smooth pb-4"
                >
                  {filteredItems.map((item, index) => (
                    <WardrobeItemCard key={item.id || index} item={item} index={index} />
                  ))}
                </div>
                <button
                  onClick={() => handleScroll("left")}
                  className="
                  absolute left-0 top-1/2 -translate-y-1/2
                  rounded-full border
                  bg-card
                  p-2
                  shadow-md
                  opacity-70
                  transition-opacity
                  hover:opacity-100
                "
                >
                  ←
                </button>

                <button
                  onClick={() => handleScroll("right")}
                  className="
                  absolute right-0 top-1/2 -translate-y-1/2
                  rounded-full border
                  bg-card
                  p-2
                  shadow-md
                  opacity-70
                  transition-opacity
                  hover:opacity-100
                "
                >
                  →
                </button>
              </div>
            ) : (
              <p>No wardrobe items match this weather. Add more in your profile!</p> // <-- Fallback
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
