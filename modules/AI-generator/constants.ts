import { TDot } from "./types/generator.types";

export const DOTS_STATES: TDot[] = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 2,
}));


export const DEFAULT_OCCASIONS = ["Casual", "Business", "Formal", "Party", "Other"];
export const DEFAULT_WEATHER = ["Sunny", "Cloudy", "Rainy", "Cold"];
export const DEFAULT_STYLES = ["Modern", "Classic", "Streetwear", "Minimalist"];