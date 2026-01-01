import { LucideIcon } from "lucide-react";

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
  time: string;
}

export interface Outfit {
  id: number;
  time?: string;
  timeRang?: string;
  name?: string;
  image: string;
  description?: string;
  temperature?: string;
  icon?: LucideIcon;
  season?: string;
  likes?: number;
  title?: string;
}

export interface WardrobeItem {
  id: string;
  name: string;
  image: string;
  category?: string;
  season: string;
  style?: string;
  createdAt?: string;
}
