"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Droplets, Wind, Eye, Thermometer, Clock } from "lucide-react";
import { Card } from "../../../../components/ui/card";
import type { WeatherData } from "../../weather.types";
import type { WeatherWidgetProps } from "./weatherWidget.types";

const getWeatherIconEl = (condition?: string) => {
  const c = (condition || "").toLowerCase();

  if (c.includes("thunder")) return <Wind className="w-32 h-32" />;
  if (c.includes("rain") || c.includes("drizzle")) return <Droplets className="w-32 h-32" />;
  if (c.includes("snow")) return <Eye className="w-32 h-32" />;
  if (c.includes("cloud")) return <Wind className="w-32 h-32" />;
  if (c.includes("clear") || c.includes("sun")) return <Eye className="w-32 h-32" />;

  return <Eye className="w-32 h-32" />;
};

type WeatherDetailItem = {
  key: "feelsLike" | "time" | "windSpeed" | "tempC";
  label: string;
  value: string;
  iconEl: React.ReactNode;
};

const buildWeatherDetails = (weather: WeatherData): WeatherDetailItem[] => [
  {
    key: "feelsLike",
    label: "Feels Like",
    value: `${weather.feelsLike}°F`,
    iconEl: <Thermometer className="w-4 h-4" />,
  },
  {
    key: "time",
    label: "Time",
    value: `${weather.time}`,
    iconEl: <Clock className="w-4 h-4" />,
  },
  {
    key: "windSpeed",
    label: "Wind Speed",
    value: `${weather.windSpeed} mph`,
    iconEl: <Wind className="w-4 h-4" />,
  },
  {
    key: "tempC",
    label: "Temperature (C)",
    value: `${weather.temperatureCelsius}°C`,
    iconEl: <Eye className="w-4 h-4" />,
  },
];

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  weather,
  loading,
}) => {
  if (!weather) return <p>No weather data available</p>;
  if (loading) return <p className="p-8">Loading weather...</p>;

  const details = buildWeatherDetails(weather);

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
            <div className="grid grid-cols-2 gap-4 mt-6">
              {details.map((d) => (
                <div
                  key={d.key}
                  className="p-4 rounded-xl transition-all duration-300 bg-[var(--outfitly-bg-secondary)] dark:bg-[var(--outfitly-bg-primary)]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[rgba(103,20,37,0.1)]">
                      {d.iconEl}
                    </div>
                    <span className="text-sm text-[var(--outfitly-text-secondary)] dark:text-[var(--outfitly-text-primary)] opacity-70 transition-colors duration-300">
                      {d.label}
                    </span>
                  </div>
                  <div className="pl-10 text-[var(--outfitly-primary)] dark:text-[var(--outfitly-text-primary)] transition-colors duration-300">
                    {d.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-64 h-64 rounded-full flex items-center justify-center relative bg-gradient-to-br from-[var(--outfitly-gradient-start)] via-[var(--outfitly-gradient-mid)] to-[var(--outfitly-gradient-end)] shadow-[0_20px_60px_rgba(103,20,37,0.3)]"
            >
              <div className="text-[var(--outfitly-text-light)]">{getWeatherIconEl(weather.condition)}</div>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default WeatherWidget;
