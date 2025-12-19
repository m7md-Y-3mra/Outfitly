import { Sparkles, Palette, Share2, Shield } from "lucide-react";
import { Feature, PinnedAnimationConfig } from "./about.types";

export const FEATURES: Feature[] = [
  {
    icon: Sparkles,
    title: "AI-Powered Styling",
    description:
      "Our advanced AI analyzes your wardrobe and creates stunning outfit combinations tailored to your style and occasions. Get personalized recommendations based on weather, events, and your preferences.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    color: "#FAF1ED",
  },
  {
    icon: Palette,
    title: "Manual Design",
    description:
      "Take full creative control. Mix and match items from your wardrobe to create unique looks that express your personality. Drag, drop, and visualize your perfect outfit.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    color: "#F2E8E3",
  },
  {
    icon: Share2,
    title: "Social Community",
    description:
      "Share your outfits, get inspired by others, and engage with a vibrant community of fashion enthusiasts worldwide. Follow trends, save favorites, and build your style network.",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
    color: "#E8DDD8",
  },
  {
    icon: Shield,
    title: "Smart Wardrobe",
    description:
      "Upload and organize your entire wardrobe digitally. Never forget what you own and make the most of every piece. Track wear history and discover underutilized items.",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
    color: "#DED3CE",
  },
];

export const PINNED_ANIMATION_CONFIG: PinnedAnimationConfig = {
  scrollDistance: "300%",
  featureTransition: 0.5,
  maskReveal: {
    duration: 1.2,
    ease: "power3.inOut",
  },
  entrance: {
    duration: 0.8,
    ease: "power3.out",
  },
};

export const PINNED_GRADIENTS = {
  light: {
    section: "linear-gradient(to bottom right, #671425, #6A1526, #4C1420)",
    overlay: "rgba(103, 20, 37, 0.85)",
  },
  dark: {
    section: "linear-gradient(to bottom right, #1C1C20, #242428, #1A1A1E)",
    overlay: "rgba(28, 28, 32, 0.9)",
  },
} as const;
