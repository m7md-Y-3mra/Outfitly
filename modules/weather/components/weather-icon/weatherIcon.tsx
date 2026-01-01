import React from "react";
import { Droplets, Wind, Eye } from "lucide-react";
import { WeatherIconProps } from "./weatherIcon.types";

export const WeatherIcon: React.FC<WeatherIconProps> = ({ condition }) => {
  const c = (condition || "").toLowerCase();

  if (c.includes("thunder")) return <Wind className="w-32 h-32" />;
  if (c.includes("rain") || c.includes("drizzle")) return <Droplets className="w-32 h-32" />;
  if (c.includes("snow")) return <Eye className="w-32 h-32" />;
  if (c.includes("cloud")) return <Wind className="w-32 h-32" />;
  if (c.includes("clear") || c.includes("sun")) return <Eye className="w-32 h-32" />;

  return <Eye className="w-32 h-32" />;
};

export default WeatherIcon;
