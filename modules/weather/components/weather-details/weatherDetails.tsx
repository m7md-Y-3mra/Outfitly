// WeatherDetails.tsx
import React from "react";
import { WEATHER_DETAIL_CONFIGS } from "./weatherDteails.constants";
import { getIconElement } from "./weatherDetails.utils";
import { WeatherDetailsProps, WeatherDetailConfig } from "./weatherDetails.types";

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({ weather }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {WEATHER_DETAIL_CONFIGS.map((config: WeatherDetailConfig) => (
        <div
          key={config.key}
          className="p-4 rounded-xl transition-all duration-300 bg-[var(--outfitly-bg-secondary)] dark:bg-[var(--outfitly-bg-primary)]"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[rgba(103,20,37,0.1)]">
              {getIconElement(config.iconName)}
            </div>
            <span className="text-sm text-[var(--outfitly-text-secondary)] dark:text-[var(--outfitly-text-primary)] opacity-70 transition-colors duration-300">
              {config.label}
            </span>
          </div>
          <div className="pl-10 text-[var(--outfitly-primary)] dark:text-[var(--outfitly-text-primary)] transition-colors duration-300">
            {config.getValue(weather)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherDetails;
