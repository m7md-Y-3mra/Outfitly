import { TDot } from "../types/generator.types";

export const DOTS_STATES: TDot[] = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  duration: 3 + Math.random() * 2,
  delay: Math.random() * 2,
}));

export const OCCASIONS = [
  "Work Meeting",
  "Casual Hangout",
  "Date Night",
  "Wedding",
  "Party",
  "Formal Event",
  "Other",
] as const;

export const WEATHER = [
  "Sunny & Hot",
  "Warm & Pleasant",
  "Cool & Breezy",
  "Cold & Windy",
  "Rainy",
  "Snowy",
] as const;

export const STYLES = [
  "CASUAL",
  "FORMAL",
  "WORK",
  "SPORTY",
  "STREETWEAR",
  "LOUNGEWEAR",
  "PARTY",
] as const;
