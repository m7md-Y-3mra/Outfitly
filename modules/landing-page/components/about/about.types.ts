import { RefObject } from "react";
import { LucideIcon } from "lucide-react";

export interface AboutRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLDivElement | null>;
  featuresRef: RefObject<HTMLDivElement | null>;
  featureCardsRef: RefObject<(HTMLDivElement | null)[]>;
  statsRef: RefObject<HTMLDivElement | null>;
  statItemsRef: RefObject<(HTMLDivElement | null)[]>;
  ctaRef: RefObject<HTMLDivElement | null>;
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface Stat {
  number: string;
  label: string;
}

export interface AboutAnimationConfig {
  duration: number;
  ease: string;
  staggerDelay: number;
}
