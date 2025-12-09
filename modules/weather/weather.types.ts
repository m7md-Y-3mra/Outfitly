export interface WeatherData {
  location: string;
  temperature: number;
  temperatureCelsius: number;
  condition: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  icon: string;
}

export interface Outfit {
  id: number;
  time: string;
  timeRange: string;
  name: string;
  image: string;
  description: string;
  temperature: string;
  icon: any; // Lucide icon
}

export interface WardrobeItem {
  id: number;
  name: string;
  image: string;
  category: string;
}
