"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import CustomButton from "../../components/custom-button";
import { PageHeader } from "../../components/page-header";
import { WeatherWidget } from "./components/weather-widget/weatherWidget";
import { OutfitCard } from "./components/outfit-card/outfitCard";
import { WardrobeItemCard } from "./components/wardrobe-item-card/wardrobeItemCard";
import { useWeather } from "./hooks/useWeather";
import WeatherErrorFallback from "./components/weather-error-fallback/weatherErrorFallback";
import WeatherWidgetLoadingFallback from "./components/weather-widget/weatherWidgetLoadingFallback";
import OutfitGridLoadingFallback from "./components/outfit-card/outfitGridLoadingFallback";
import WardrobeCarouselLoadingFallback from "./components/wardrobe-item-card/wardrobeCarouselLoadingFallback";

export default function Weather() {
  const {
    weather,
    season,
    weatherStatus,
    weatherError,
    filteredOutfits,
    filteredItems,
    handleScroll,
    itemsContainerRef,
  } = useWeather();

  return (
    <div className="bg-background">
      <main className="pt-20 pb-16">
        <PageHeader
          title="Today's Weather Outfits"
          subtitle="Dress perfectly for the weather conditions"
        />

        <div className="container mx-auto px-4 max-w-7xl mt-12">
          {/* ================= LOADING STATE ================= */}
          {weatherStatus === "loading" && (
            <>
              <WeatherWidgetLoadingFallback />
              <OutfitGridLoadingFallback count={4} />
              <WardrobeCarouselLoadingFallback count={6} />
            </>
          )}

          {/* ================= ERROR STATE ================= */}
          {weatherStatus === "error" && weatherError && (
            <WeatherErrorFallback error={weatherError} onRetry={() => window.location.reload()} />
          )}

          {/* ================= READY STATE ================= */}
          {weatherStatus === "ready" && weather && (
            <>
              {/* Weather Widget */}
              <WeatherWidget weather={weather} loading={false} />

              {/* Outfits Section */}
              <section>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.2 } }}
                >
                  <h2 className="mt-12 mb-8 text-2xl font-extrabold tracking-wide bg-gradient-to-r from-[var(--outfitly-gradient-start)] via-[var(--outfitly-gradient-mid)] to-[var(--outfitly-gradient-end)] bg-clip-text text-transparent">
                    Perfect outfits for today ({season} weather):
                  </h2>

                  {filteredOutfits.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {filteredOutfits.map((outfit, index) => (
                        <OutfitCard key={outfit.id || index} outfit={outfit} index={index} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      No outfits match this weather. Try adding more to your profile!
                    </p>
                  )}
                </motion.div>
              </section>

              {/* Wardrobe Items Section */}
              <section>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.4 } }}
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

                  {filteredItems.length > 0 ? (
                    <div className="relative">
                      <div
                        ref={itemsContainerRef}
                        className="flex overflow-x-auto space-x-4 scroll-smooth pb-4"
                      >
                        {filteredItems.map((item, index) => (
                          <WardrobeItemCard key={item.id || index} item={item} index={index} />
                        ))}
                      </div>

                      <button
                        onClick={() => handleScroll("left")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full border bg-card p-2 shadow-md opacity-70 transition-opacity hover:opacity-100"
                      >
                        ←
                      </button>

                      <button
                        onClick={() => handleScroll("right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border bg-card p-2 shadow-md opacity-70 transition-opacity hover:opacity-100"
                      >
                        →
                      </button>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      No wardrobe items match this weather. Add more in your profile!
                    </p>
                  )}
                </motion.div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
