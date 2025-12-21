import { WeatherData, Outfit, WardrobeItem } from "./weather.types";
import { Sunrise, Sun, Sunset, Moon } from "lucide-react";

export const mockWeather: WeatherData = {
  location: "Gaza, Palestine",
  temperature: 77,
  temperatureCelsius: 25,
  condition: "Sunny",
  feelsLike: 78,
  humidity: 60,
  windSpeed: 10,
  uvIndex: 7,
  icon: "sunny",
  time: "27-12-2025",
};

export const timeBasedOutfits: Outfit[] = [
  {
    id: 1,
    time: "Morning",
    name: "Fresh Start Look",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    description: "Light layers for the cool morning",
    temperature: "68°F",
    icon: Sunrise,
    season: "autumn", // Mild, cloudy weather
  },
  {
    id: 2,
    time: "Afternoon",
    name: "Peak Sun Style",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    description: "Comfortable for warmer temps",
    temperature: "75°F",
    icon: Sun,
    season: "summer", // Hot, sunny
  },
  {
    id: 3,
    time: "Evening",
    name: "Cool Down Outfit",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    description: "Perfect for cooling evenings",
    temperature: "65°F",
    icon: Sunset,
    season: "spring", // Rainy, mild
  },
  {
    id: 4,
    time: "Night",
    name: "Nighttime Chic",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    description: "Cozy and stylish for late nights",
    temperature: "55°F",
    icon: Moon,
    season: "winter", // Cold
  },
];

export const suitableItems: WardrobeItem[] = [
  {
    id: "1",
    name: "Light Cardigan",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80",
    category: "Outerwear",
    season: "autumn",
  },
  {
    id: "2",
    name: "Cotton T-Shirt",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80",
    category: "Tops",
    season: "summer",
  },
  {
    id: "3", 
    name: "Denim Jeans",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80",
    category: "Bottoms",
    season: "autumn",
  },
  {
    id: "4",
    name: "White Sneakers",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80",
    category: "Shoes",
    season: "summer",
  },
  {
    id: "5",
    name: "Sunglasses",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&q=80",
    category: "Accessories",
    season: "summer",
  },
  {
    id: "6",
    name: "Light Scarf",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80",
    category: "Accessories",
    season: "spring",
  },
  {
    id: "7",
    name: "Summer Dress",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80",
    category: "Dresses",
    season: "summer",
  },
  {
    id: "8",
    name: "Leather Jacket",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
    category: "Outerwear",
    season: "winter",
  },
  {
    id: "9",
    name: "Sweater",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80",
    category: "Tops",
    season: "winter",
  },
  {
    id: "10",
    name: "Boots",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&q=80",
    category: "Shoes",
    season: "winter",
  },
];
