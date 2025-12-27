import { WeatherDetailConfig } from "./weatherDetails.types";

export const WEATHER_DETAIL_CONFIGS: WeatherDetailConfig[] = [
  {
    key: "feelsLike",
    label: "Feels Like",
    getValue: (weather) => `${weather.feelsLike}°F`,
    iconName: "Thermometer",
  },
  {
    key: "time",
    label: "Time",
    getValue: (weather) => `${weather.time}`,
    iconName: "Clock",
  },
  {
    key: "windSpeed",
    label: "Wind Speed",
    getValue: (weather) => `${weather.windSpeed} mph`,
    iconName: "Wind",
  },
  {
    key: "tempC",
    label: "Temperature (C)",
    getValue: (weather) => `${weather.temperatureCelsius}°C`,
    iconName: "Eye",
  },
];
