import { Testimonial, TestimonialsConfig } from "./testimonials.types";

export const TESTIMONIALS_CONTENT = {
  heading: {
    title: "Loved by Fashion Enthusiasts",
    subtitle: "Join thousands who've transformed their style journey with Outfitly",
  },
  badge: "Real Stories",
} as const;

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Mitchell",
    role: "Fashion Blogger",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    content:
      "Outfitly completely changed how I approach my wardrobe. The AI suggestions are incredibly accurate and have helped me discover combinations I never would have thought of!",
    rating: 5,
    highlight: "Game changer for my daily styling",
  },
  {
    id: "t2",
    name: "Michael Chen",
    role: "Tech Executive",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    content:
      "As someone who used to struggle with fashion, this app has been a lifesaver. I now get compliments on my outfits regularly. The smart wardrobe feature is brilliant.",
    rating: 5,
    highlight: "From clueless to confident",
  },
  {
    id: "t3",
    name: "Emma Rodriguez",
    role: "Interior Designer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    content:
      "The community feature is what sets Outfitly apart. I love seeing what others create and getting inspired. It's like having a personal stylist and fashion community in one app.",
    rating: 5,
    highlight: "Amazing community vibes",
  },
  {
    id: "t4",
    name: "David Park",
    role: "Photographer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    content:
      "I've tried many styling apps, but none come close to Outfitly. The interface is beautiful, and the AI actually understands my style preferences. Highly recommended!",
    rating: 5,
    highlight: "Best styling app out there",
  },
  {
    id: "t5",
    name: "Lisa Thompson",
    role: "Marketing Manager",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80",
    content:
      "Outfitly saved me so much time in the morning! I used to spend ages deciding what to wear. Now I just open the app and have perfect outfit suggestions ready.",
    rating: 5,
    highlight: "Morning routine transformed",
  },
  {
    id: "t6",
    name: "James Wilson",
    role: "Startup Founder",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
    content:
      "The manual design feature lets me experiment with my style while the AI keeps me grounded. Perfect balance of creativity and practicality.",
    rating: 5,
    highlight: "Perfect balance of features",
  },
  {
    id: "t7",
    name: "Aisha Patel",
    role: "UX Designer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    content:
      "As a designer, I appreciate the attention to detail in this app. It's not just functional—it's beautiful. The animations and UI are top-notch!",
    rating: 5,
    highlight: "Beautiful design & UX",
  },
  {
    id: "t8",
    name: "Robert Kim",
    role: "Consultant",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
    content:
      "I travel a lot for work and Outfitly helps me pack smart. I can plan outfits for an entire trip and make sure everything coordinates perfectly.",
    rating: 5,
    highlight: "Travel packing made easy",
  },
];

export const TESTIMONIALS_CONFIG: TestimonialsConfig = {
  scrollSpeed: 30, // pixels per second
  pauseDuration: 0.3,
  cardRotation: 5,
  entrance: {
    duration: 0.8,
    ease: "power3.out",
  },
};

export const TESTIMONIALS_GRADIENTS = {
  light: {
    section:
      "linear-gradient(180deg, rgba(250, 241, 237, 1) 0%, rgba(242, 232, 227, 1) 50%, rgba(250, 241, 237, 1) 100%)",
    card: "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(250, 241, 237, 0.8))",
    cardHover: "linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(250, 241, 237, 0.95))",
    text: "linear-gradient(135deg, #671425, #8B1D35)",
    accent: "#671425",
  },
  dark: {
    section:
      "linear-gradient(180deg, rgba(26, 26, 26, 1) 0%, rgba(32, 32, 36, 1) 50%, rgba(26, 26, 26, 1) 100%)",
    card: "linear-gradient(135deg, rgba(42, 42, 46, 0.9), rgba(32, 32, 36, 0.8))",
    cardHover: "linear-gradient(135deg, rgba(52, 52, 56, 1), rgba(42, 42, 46, 0.95))",
    text: "linear-gradient(135deg, #FAF1ED, #F2E8E3)",
    accent: "#FAF1ED",
  },
} as const;
