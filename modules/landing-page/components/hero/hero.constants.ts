import { FloatingElement, HeroAnimationConfig } from "./hero.types";

export const HERO_CONTENT = {
  badge: "Your Smart Fashion Companion",
  heading: {
    line1: "Elevate Your",
    line2: "Style Journey",
  },
  subheading:
    "Upload your wardrobe, let AI curate perfect outfits, or design manually. Join a vibrant community sharing and celebrating style together.",
  cta: {
    primary: "Get Started Free",
    secondary: "Watch Demo",
  },
  features: [
    {
      icon: "wand",
      label: "AI-Powered",
      description: "Smart Styling",
    },
    {
      icon: "users",
      label: "50K+ Users",
      description: "Active Community",
    },
  ],
} as const;

export const HERO_ANIMATION_CONFIG: HeroAnimationConfig = {
  duration: 1.2,
  ease: "power4.out",
  staggerDelay: 0.15,
};

export const FLOATING_ELEMENTS: FloatingElement[] = [
  {
    id: "element-1",
    icon: "shirt",
    size: 60,
    initialPosition: { x: -200, y: -100, z: 50 },
    animationDelay: 0,
    rotationAxis: "y",
  },
  {
    id: "element-2",
    icon: "dress",
    size: 70,
    initialPosition: { x: 250, y: -150, z: 80 },
    animationDelay: 0.5,
    rotationAxis: "x",
  },
  {
    id: "element-3",
    icon: "shoe",
    size: 50,
    initialPosition: { x: -280, y: 100, z: 40 },
    animationDelay: 1,
    rotationAxis: "z",
  },
  {
    id: "element-4",
    icon: "bag",
    size: 55,
    initialPosition: { x: 300, y: 80, z: 60 },
    animationDelay: 1.5,
    rotationAxis: "y",
  },
  {
    id: "element-5",
    icon: "watch",
    size: 45,
    initialPosition: { x: -150, y: 200, z: 30 },
    animationDelay: 2,
    rotationAxis: "x",
  },
  {
    id: "element-6",
    icon: "pants",
    size: 65,
    initialPosition: { x: 180, y: 180, z: 70 },
    animationDelay: 2.5,
    rotationAxis: "z",
  },
];

export const HERO_BACKGROUND_IMAGE =
  "https://images.unsplash.com/photo-1593032470861-4509830938cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjB3YXJkcm9iZSUyMHN1aXRzfGVufDF8fHx8MTc2NDI0OTU0MXww&ixlib=rb-4.1.0&q=80&w=1080";

export const GRADIENT_COLORS = {
  light: {
    overlay: "linear-gradient(135deg, rgba(103, 20, 37, 0.65), rgba(139, 29, 53, 0.55), rgba(76, 20, 32, 0.70))",
    bottom: "linear-gradient(to top, rgba(250, 241, 237, 1), transparent)",
  },
  dark: {
    overlay: "linear-gradient(135deg, rgba(103, 20, 37, 0.80), rgba(139, 29, 53, 0.70), rgba(76, 20, 32, 0.85))",
    bottom: "linear-gradient(to top, rgba(26, 26, 26, 1), transparent)",
  },
} as const;
