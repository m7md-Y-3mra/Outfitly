"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Droplets, Wind, Eye, Thermometer, Clock } from "lucide-react";
import { Card } from "../../../../components/ui/card";
import { useTheme } from "next-themes";
import type { WeatherData } from "../../weather.types";

/**
 * ✅ Return ICON ELEMENTS (JSX), not component types.
 * This avoids: "Cannot create components during render".
 */
const getWeatherIconEl = (condition?: string) => {
  const c = (condition || "").toLowerCase();

  // Adjust these mappings to match your API strings
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

export const WeatherWidget: React.FC<{ weather: WeatherData }> = ({ weather }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const details = buildWeatherDetails(weather);

  const cardBorder = isDark ? "var(--outfitly-primary)" : "var(--outfitly-bg-secondary)";
  const titleColor = isDark ? "var(--outfitly-text-primary)" : "var(--outfitly-text-secondary)";
  const secondaryColor = isDark ? "var(--outfitly-text-primary)" : "var(--outfitly-text-secondary)";
  const accentColor = isDark ? "var(--outfitly-text-primary)" : "var(--outfitly-primary)";
  const detailBg = isDark ? "var(--outfitly-bg-primary)" : "var(--outfitly-bg-secondary)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card
        className="p-8 border-2 shadow-2xl transition-all duration-300 relative overflow-hidden"
        style={{
          borderColor: cardBorder,
          backgroundColor: "var(--card)",
        }}
      >
        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left */}
            <div>
              {/* Location */}
              <div className="flex items-center gap-2 mb-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--outfitly-gradient-start) 0%, var(--outfitly-gradient-mid) 100%)",
                  }}
                >
                  <MapPin className="w-5 h-5" style={{ color: "var(--outfitly-text-light)" }} />
                </div>

                <span
                  className="text-xl transition-colors duration-300"
                  style={{ color: titleColor }}
                >
                  {weather.location}
                </span>
              </div>

              {/* Temperature */}
              <div className="flex items-center gap-6 mb-4">
                <div
                  className="text-7xl"
                  style={{
                    fontWeight: 900,
                    background:
                      "linear-gradient(to bottom right, var(--outfitly-gradient-start), var(--outfitly-gradient-mid), var(--outfitly-gradient-end))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {weather.temperature}°
                </div>

                <div>
                  <div
                    className="text-2xl mb-1 transition-colors duration-300"
                    style={{ color: accentColor }}
                  >
                    {weather.condition}
                  </div>

                  <div
                    className="text-sm opacity-70 transition-colors duration-300"
                    style={{ color: secondaryColor }}
                  >
                    {weather.temperatureCelsius}°C
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {details.map((d) => (
                  <div
                    key={d.key}
                    className="p-4 rounded-xl transition-all duration-300"
                    style={{ backgroundColor: detailBg }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: "rgba(103, 20, 37, 0.1)" }}
                      >
                        <span className="w-4 h-4" style={{ color: "var(--outfitly-primary)" }}>
                          {d.iconEl}
                        </span>
                      </div>

                      <span
                        className="text-sm opacity-70 transition-colors duration-300"
                        style={{ color: secondaryColor }}
                      >
                        {d.label}
                      </span>
                    </div>

                    <div
                      className="transition-colors duration-300 pl-10"
                      style={{ color: accentColor }}
                    >
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
                className="w-64 h-64 rounded-full flex items-center justify-center relative"
                style={{
                  background:
                    "linear-gradient(135deg, var(--outfitly-gradient-start) 0%, var(--outfitly-gradient-mid) 50%, var(--outfitly-gradient-end) 100%)",
                  boxShadow: "0 20px 60px rgba(103, 20, 37, 0.3)",
                }}
              >
                {/* ✅ icon element, not component */}
                <div style={{ color: "var(--outfitly-text-light)" }}>
                  {getWeatherIconEl(weather.condition)}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default WeatherWidget;
