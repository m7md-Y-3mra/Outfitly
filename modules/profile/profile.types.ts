export type TabType = "outfits" | "liked-products" | "liked-outfits";

export interface User {
  name: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  joinDate: string;
  avatar: string;
  stats: {
    outfits: number;
    followers: number;
    following: number;
  };
}

export interface Outfit {
  id: number;
  image: string;
  likes: number;
  title: string;
}

export interface LikedProduct {
  id: number;
  image: string;
  name: string;
  price: string;
}