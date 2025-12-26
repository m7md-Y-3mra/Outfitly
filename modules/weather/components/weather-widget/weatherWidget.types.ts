import { WeatherData } from "../../weather.types";

export type WeatherWidgetProps = {
  weather: WeatherData | null;
  loading: boolean;
};
