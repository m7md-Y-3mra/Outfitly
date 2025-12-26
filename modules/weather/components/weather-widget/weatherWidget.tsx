"use client";  // Still needed for Framer Motion

import React from "react";
import { motion } from "framer-motion";
import { MapPin} from "lucide-react";
import { Card } from "../../../../components/ui/card";
import type { WeatherWidgetProps} from "./weatherWidget.types";
import { WeatherIcon } from "../weather-icon/weatherIcon";  
import WeatherDetails from "../weather-details/weatherDetails";


export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  weather,
  loading,
}) => {
  if (!weather) return <p>No weather data available</p>;
  if (loading) return <p className="p-8">Loading weather...</p>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card className="p-8 border-2 border-[var(--outfitly-bg-secondary)] dark:border-[var(--outfitly-bg-tertiary)] bg-[var(--card)] shadow-2xl transition-all duration-300 relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left */}
          <div>
            {/* Location */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md bg-gradient-to-br from-[var(--outfitly-gradient-start)] to-[var(--outfitly-gradient-mid)]">
                <MapPin className="w-5 h-5 text-[var(--outfitly-text-light)]" />
              </div>
              <span className="text-xl text-[var(--outfitly-text-secondary)] dark:text-[var(--outfitly-text-primary)] transition-colors duration-300">
                {weather.location}
              </span>
            </div>

            {/* Temperature */}
            <div className="flex items-center gap-6 mb-4">
              <div className="text-7xl font-black bg-gradient-to-br from-[var(--outfitly-gradient-start)] via-[var(--outfitly-gradient-mid)] to-[var(--outfitly-gradient-end)] bg-clip-text text-transparent">
                {weather.temperature}°
              </div>

              <div>
                <div className="text-2xl text-[var(--outfitly-primary)] dark:text-[var(--outfitly-text-primary)] mb-1 transition-colors duration-300">
                  {weather.condition}
                </div>
                <div className="text-sm text-[var(--outfitly-text-secondary)] dark:text-[var(--outfitly-text-primary)] opacity-70 transition-colors duration-300">
                  {weather.temperatureCelsius}°C
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <WeatherDetails weather={weather}/>
          </div>

          {/* Right */}
          <div className="flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-64 h-64 rounded-full flex items-center justify-center relative bg-gradient-to-br from-[var(--outfitly-gradient-start)] via-[var(--outfitly-gradient-mid)] to-[var(--outfitly-gradient-end)] shadow-[0_20px_60px_rgba(103,20,37,0.3)]"
            >
              <div className="text-[var(--outfitly-text-light)]">
                <WeatherIcon condition={weather.condition} />
              </div>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default WeatherWidget;