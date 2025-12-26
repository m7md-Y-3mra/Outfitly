import type { WeatherData } from "../../weather.types";

export interface WeatherDetailsProps {
  weather: WeatherData;
}

export interface WeatherDetailConfig {
  key: string;
  label: string;
  getValue: (weather: WeatherData) => string;
  iconName: string; 
}
