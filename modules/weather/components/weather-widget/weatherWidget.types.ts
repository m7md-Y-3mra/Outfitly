import { WeatherData } from "../../weather.types";

export type WeatherWidgetProps = {
  weather: WeatherData | null;
  loading: boolean;
};

export type WeatherDetailItem = {
  key: "feelsLike" | "time" | "windSpeed" | "tempC";
  label: string;
  value: string;
  iconEl: React.ReactNode;
};
