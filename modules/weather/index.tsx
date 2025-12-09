"use client";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import CustomButton from "../../components/custom-button";
import { useTheme } from "next-themes";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { PageHeader } from "../../components/page-header";
import { useWeather } from "./hooks/useWeather";
import { WeatherWidget } from "./components/weather-widget/weatherWidget";
import { OutfitCard } from "./components/outfit-card/outfitCard";
import { WardrobeItemCard } from "./components/wardrobe-item-card/wardrobeItemCard";

export default function WeatherPage() {
  const { theme } = useTheme();
  const { weather, outfits, items, handleScroll } = useWeather();

  return (
    <div style={{ backgroundColor: theme === "dark" ? "#1a1a1a" : "#FAF1ED" }}>
      <Navbar />
      <main className="pt-20 pb-16">
        <PageHeader
          title="Today's Weather Outfits"
          subtitle="Dress perfectly for the weather conditions"
        />
        <div className="container mx-auto px-4 max-w-7xl mt-12">
          <WeatherWidget weather={weather} />

          {/* Outfits Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.6, delay: 0.3 },
            }}
          >
            <div className="flex items-center justify-between mt-12 mb-6">
              <h2
                className="mb-8 bg-gradient-to-r from-[#671425] via-[#8B1D35] to-[#A82444] bg-clip-text text-transparent"
                style={{
                  fontSize: "2rem",
                  fontWeight: "900",
                  letterSpacing: "0.02em",
                }}
              >
                Perfect outfits for today:
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {outfits.map((outfit, index) => (
                <OutfitCard key={index} outfit={outfit} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Wardrobe Items Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.5 } }}
          >
            <div className="flex items-center justify-between mt-12 mb-6">
              <h2
                className="bg-gradient-to-r from-[#671425] via-[#8B1D35] to-[#A82444] bg-clip-text text-transparent"
                style={{
                  fontSize: "2rem",
                  fontWeight: "900",
                  letterSpacing: "0.02em",
                }}
              >
                Your wardrobe items for this weather:
              </h2>
              <CustomButton variant="link" className="flex items-center gap-2">
                See All
                <ChevronRight size={16} />
              </CustomButton>
            </div>
            <div className="relative">
              <div id="items-scroll" className="flex overflow-x-auto space-x-4 scroll-smooth pb-4">
                {items.map((item, index) => (
                  <WardrobeItemCard key={index} item={item} index={index} />
                ))}
              </div>
              <button
                onClick={() => handleScroll("left")}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md"
              >
                &#8592;
              </button>
              <button
                onClick={() => handleScroll("right")}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow-md"
              >
                &#8594;
              </button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
