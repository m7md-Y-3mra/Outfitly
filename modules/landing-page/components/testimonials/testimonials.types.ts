import { RefObject } from "react";

export interface TestimonialsRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLDivElement | null>;
  track1Ref: RefObject<HTMLDivElement | null>;
  track2Ref: RefObject<HTMLDivElement | null>;
  cardsRef: RefObject<(HTMLDivElement | null)[]>;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
  highlight?: string;
}

export interface TestimonialsConfig {
  scrollSpeed: number;
  pauseDuration: number;
  cardRotation: number;
  entrance: {
    duration: number;
    ease: string;
  };
}
