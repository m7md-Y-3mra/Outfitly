import { Sparkles, Palette, Share2, Shield } from "lucide-react";
import { Feature, Stat, AboutAnimationConfig } from "./about.types";

export const ABOUT_CONTENT = {
  heading: {
    title: "Your Personal Style Assistant",
    subtitle:
      "Outfitly combines cutting-edge AI technology with social connectivity to revolutionize how you approach fashion",
  },
  cta: {
    title: "Ready to Transform Your Wardrobe?",
    subtitle: "Join thousands of fashion enthusiasts already using Outfitly",
    button: "Start Free Trial",
  },
} as const;

export const FEATURES: Feature[] = [
  {
    icon: Sparkles,
    title: "AI-Powered Styling",
    description:
      "Our advanced AI analyzes your wardrobe and creates stunning outfit combinations tailored to your style and occasions.",
  },
  {
    icon: Palette,
    title: "Manual Design",
    description:
      "Take full creative control. Mix and match items from your wardrobe to create unique looks that express your personality.",
  },
  {
    icon: Share2,
    title: "Social Community",
    description:
      "Share your outfits, get inspired by others, and engage with a vibrant community of fashion enthusiasts worldwide.",
  },
  {
    icon: Shield,
    title: "Smart Wardrobe",
    description:
      "Upload and organize your entire wardrobe digitally. Never forget what you own and make the most of every piece.",
  },
];

export const STATS: Stat[] = [
  { number: "50K+", label: "Active Users" },
  { number: "2M+", label: "Outfits Created" },
  { number: "500K+", label: "AI Suggestions" },
  { number: "95%", label: "Satisfaction Rate" },
];

export const ABOUT_ANIMATION_CONFIG: AboutAnimationConfig = {
  duration: 0.8,
  ease: "power3.out",
  staggerDelay: 0.1,
};

export const ABOUT_GRADIENTS = {
  light: {
    section: "linear-gradient(to bottom right, #671425, #6A1526, #4C1420)",
    stats: "linear-gradient(to right, #FAF1ED, #F2E8E3, #FAF1ED)",
    cta: "linear-gradient(to right, rgba(250, 241, 237, 0.95), rgba(242, 232, 227, 0.95))",
    text: "linear-gradient(to bottom right, #671425, #6A1526)",
  },
  dark: {
    section: "linear-gradient(to bottom right, #1C1C20, #242428, #1A1A1E)",
    stats: "linear-gradient(to right, #2A2A2E, #323236, #2A2A2E)",
    cta: "linear-gradient(to right, rgba(42, 42, 46, 0.95), rgba(50, 50, 54, 0.95))",
    text: "linear-gradient(to bottom right, #FAF1ED, #F2E8E3)",
  },
} as const;
