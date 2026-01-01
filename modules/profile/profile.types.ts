import { LucideIcon } from "lucide-react";
export type TabType = "outfits" | "liked-outfits";

export interface User {
  id: string;
  name: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  joinDate: string;
  avatarUrl: string;
  stats: { outfits: number; followers: number; following: number };
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

export interface IPaginationQuery {
  page: number;
  limit: number;
  order?: "asc" | "desc";
  field?: "createdAt" | "name";
}

export interface IPaginationResult<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export type SortOrder = "asc" | "desc";
