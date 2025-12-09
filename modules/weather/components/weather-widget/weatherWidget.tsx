import { motion } from 'framer-motion';
import { MapPin, Droplets, Wind, Eye } from 'lucide-react';
import { Card } from '../../../../components/ui/card'; // Or '@/components/ui/card' if using aliases
import { useTheme } from "next-themes";
import { WeatherData } from '../../weather.types';
import { getWeatherIcon } from '../../weather.utils';

// Interface for weather details to ensure type safety and reduce duplication
interface WeatherDetail {
  icon: React.ComponentType<{ className?: string }>; // Lucide icon component
  label: string;
  value: string | number;
}

interface WeatherWidgetProps {
  weather: WeatherData;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather }) => {
  const { theme } = useTheme();
  const WeatherIcon = getWeatherIcon(weather.condition);

  // Array of weather details for dynamic rendering (eliminates duplication)
  const weatherDetails: WeatherDetail[] = [
    { icon: Wind, label: "Feels Like", value: `${weather.feelsLike}°F` },
    { icon: Droplets, label: "Humidity", value: `${weather.humidity}%` },
    { icon: Wind, label: "Wind Speed", value: `${weather.windSpeed} mph` },
    { icon: Eye, label: "UV Index", value: `${weather.uvIndex} (Moderate)` },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Card
        className="p-8 border-2 shadow-2xl transition-all duration-300 relative overflow-hidden"
        style={{
          borderColor: theme === "dark" ? "#671425" : "#F2E8E3",
          backgroundColor: theme === "dark" ? "#2A2A30" : "#FFFFFF",
        }}
      >
        {/* Animated Gradient Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#671425] via-[#8B1D35] to-[#A82444] opacity-10 rounded-full blur-3xl animate-pulse" />

        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Main Weather Info */}
            <div>
              {/* Location */}
              <div className="flex items-center gap-2 mb-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
                  style={{
                    background: "linear-gradient(135deg, #671425 0%, #8B1D35 100%)",
                  }}
                >
                  <MapPin className="w-5 h-5" style={{ color: "#FAF1ED" }} />
                </div>
                <span
                  className="text-xl transition-colors duration-300"
                  style={{ color: theme === "dark" ? "#FAF1ED" : "#4C1420" }}
                >
                  {weather.location}
                </span>
              </div>

              {/* Temperature */}
              <div className="flex items-center gap-6 mb-4">
                <div
                  className="text-7xl bg-gradient-to-br from-[#671425] via-[#8B1D35] to-[#A82444] bg-clip-text text-transparent"
                  style={{ fontWeight: "900" }}
                >
                  {weather.temperature}°
                </div>
                <div>
                  <div
                    className="text-2xl mb-1 transition-colors duration-300"
                    style={{ color: theme === "dark" ? "#FAF1ED" : "#671425" }}
                  >
                    {weather.condition}
                  </div>
                  <div
                    className="text-sm opacity-70 transition-colors duration-300"
                    style={{ color: theme === "dark" ? "#FAF1ED" : "#4C1420" }}
                  >
                    {weather.temperatureCelsius}°C
                  </div>
                </div>
              </div>

              {/* Weather Details Grid - Now dynamic and DRY */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {weatherDetails.map((detail, index) => {
                  const IconComponent = detail.icon; // Dynamically render the icon
                  return (
                    <div
                      key={index} // Use index or a unique key if available
                      className="p-4 rounded-xl transition-all duration-300"
                      style={{
                        backgroundColor: theme === "dark" ? "#1a1a1a" : "#F2E8E3",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: "rgba(103, 20, 37, 0.1)" }}
                        >
                          <IconComponent className="w-4 h-4" style={{ color: "#671425" }} />
                        </div>
                        <span
                          className="text-sm opacity-70 transition-colors duration-300"
                          style={{ color: theme === "dark" ? "#FAF1ED" : "#4C1420" }}
                        >
                          {detail.label}
                        </span>
                      </div>
                      <div
                        className="transition-colors duration-300"
                        style={{ color: theme === "dark" ? "#FAF1ED" : "#671425" }}
                      >
                        {detail.value}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Large Weather Icon */}
            <div className="flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-64 h-64 rounded-full flex items-center justify-center relative"
                style={{
                  background: "linear-gradient(135deg, #671425 0%, #8B1D35 50%, #A82444 100%)",
                  boxShadow: "0 20px 60px rgba(103, 20, 37, 0.3)",
                }}
              >
                <WeatherIcon className="w-32 h-32" style={{ color: "#FAF1ED" }} />
              </motion.div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};