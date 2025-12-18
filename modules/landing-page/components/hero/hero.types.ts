import { RefObject } from "react";

export interface HeroRefs {
  containerRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  subheadingRef: RefObject<HTMLParagraphElement | null>;
  badgeRef: RefObject<HTMLDivElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
  featuresRef: RefObject<HTMLDivElement | null>;
  scrollIndicatorRef: RefObject<HTMLDivElement | null>;
  floatingElementsRef: RefObject<(HTMLDivElement | null)[]>;
  card3DRef: RefObject<HTMLDivElement | null>;
}

export interface FloatingElement {
  id: string;
  icon: "shirt" | "pants" | "dress" | "shoe" | "bag" | "watch";
  size: number;
  initialPosition: {
    x: number;
    y: number;
    z: number;
  };
  animationDelay: number;
  rotationAxis: "x" | "y" | "z";
}

export interface HeroAnimationConfig {
  duration: number;
  ease: string;
  staggerDelay: number;
}

export interface Card3DProps {
  rotateX: number;
  rotateY: number;
  translateZ: number;
}
