import { TIconType, TOccasionValue, TStyleValue, TWeatherValue } from "../types/generator.types";
import {
  Briefcase,
  Coffee,
  Wine,
  Music,
  Users,
  Crown,
  Edit3,
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Snowflake,
  Shirt,
  Zap,
  Dumbbell,
  Home,
} from "lucide-react";

export const OCCASIONS: ReadonlyArray<{ value: TOccasionValue; icon: TIconType }> = [
  { value: "Work Meeting", icon: Briefcase },
  { value: "Casual Hangout", icon: Coffee },
  { value: "Date Night", icon: Wine },
  { value: "Wedding", icon: Crown },
  { value: "Party", icon: Music },
  { value: "Formal Event", icon: Users },
  { value: "Other", icon: Edit3 },
];

export const WEATHER: ReadonlyArray<{ value: TWeatherValue; icon: TIconType }> = [
  { value: "Sunny & Hot", icon: Sun },
  { value: "Warm & Pleasant", icon: Cloud },
  { value: "Cool & Breezy", icon: Wind },
  { value: "Cold & Windy", icon: Wind },
  { value: "Rainy", icon: CloudRain },
  { value: "Snowy", icon: Snowflake },
];

export const STYLES: ReadonlyArray<{ value: TStyleValue; icon: TIconType }> = [
  { value: "CASUAL", icon: Shirt },
  { value: "FORMAL", icon: Crown },
  { value: "WORK", icon: Briefcase },
  { value: "SPORTY", icon: Dumbbell },
  { value: "STREETWEAR", icon: Zap },
  { value: "LOUNGEWEAR", icon: Home },
  { value: "PARTY", icon: Music },
];
