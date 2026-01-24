import { HeroAnimationConfig, ParallaxLayer } from "./hero.types";

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
  splitText: {
    charStagger: 0.03,
    duration: 0.8,
    ease: "power4.out",
  },
  parallax: {
    intensity: {
      desktop: 1,
      tablet: 0.6,
      mobile: 0.3,
    },
  },
  entrance: {
    duration: 1.2,
    ease: "power4.out",
    staggerDelay: 0.15,
  },
};

export const PARALLAX_LAYERS: ParallaxLayer[] = [
  { speed: 0.2, zIndex: 1, opacity: 0.4 },
  { speed: 0.4, zIndex: 2, opacity: 0.6 },
  { speed: 0.6, zIndex: 3, opacity: 0.3 },
];

export const HERO_BACKGROUND_IMAGE = "/hero-image.jpg";

export const PARALLAX_IMAGES = {
  layer1: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  layer2: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
  layer3: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80",
};

export const GRADIENT_COLORS = {
  light: {
    overlay:
      "linear-gradient(135deg, rgba(103, 20, 37, 0.55), rgba(139, 29, 53, 0.45), rgba(76, 20, 32, 0.60))",
    bottom: "linear-gradient(to top, rgba(250, 241, 237, 1), transparent)",
  },
  dark: {
    overlay:
      "linear-gradient(135deg, rgba(103, 20, 37, 0.70), rgba(139, 29, 53, 0.60), rgba(76, 20, 32, 0.75))",
    bottom: "linear-gradient(to top, rgba(26, 26, 26, 1), transparent)",
  },
} as const;
