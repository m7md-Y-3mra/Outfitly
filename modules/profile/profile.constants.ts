import type { User, Outfit, LikedProduct } from "./profile.types";

export const mockUser: User = {
  id: "user_12345",
  name: "Sarah Johnson",
  username: "@sarahjohnson",
  bio: "Fashion enthusiast | Style curator | Creating looks that inspire ✨",
  location: "New York, NY",
  website: "www.sarahstyle.com",
  joinDate: "Joined March 2024",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  stats: {
    outfits: 156,
    followers: 2847,
    following: 892,
  },
};

export const mockOutfits: Outfit[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    likes: 234,
    title: "Summer Vibes",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    likes: 189,
    title: "Casual Chic",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    likes: 456,
    title: "Evening Elegance",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
    likes: 321,
    title: "Street Style",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1558769132-cb1aea9c6db8?w=800&q=80",
    likes: 267,
    title: "Office Ready",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&q=80",
    likes: 398,
    title: "Date Night",
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80",
    likes: 412,
    title: "Weekend Casual",
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    likes: 289,
    title: "Boho Dreams",
  },
];

export const mockLikedProducts: LikedProduct[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    name: "Classic Sneakers",
    price: "$89.99",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    name: "Denim Jacket",
    price: "$129.99",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    name: "Summer Dress",
    price: "$79.99",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?w=800&q=80",
    name: "Leather Boots",
    price: "$159.99",
  },
];
