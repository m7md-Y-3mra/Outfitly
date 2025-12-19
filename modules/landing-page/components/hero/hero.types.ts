import { RefObject } from "react";

export interface HeroRefs {
  containerRef: RefObject<HTMLElement | null>;
  headingLine1Ref: RefObject<HTMLSpanElement | null>;
  headingLine2Ref: RefObject<HTMLSpanElement | null>;
  subheadingRef: RefObject<HTMLParagraphElement | null>;
  badgeRef: RefObject<HTMLDivElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
  featuresRef: RefObject<HTMLDivElement | null>;
  scrollIndicatorRef: RefObject<HTMLDivElement | null>;
  parallaxLayer1Ref: RefObject<HTMLDivElement | null>;
  parallaxLayer2Ref: RefObject<HTMLDivElement | null>;
  parallaxLayer3Ref: RefObject<HTMLDivElement | null>;
}

export interface HeroAnimationConfig {
  splitText: {
    charStagger: number;
    duration: number;
    ease: string;
  };
  parallax: {
    intensity: {
      desktop: number;
      tablet: number;
      mobile: number;
    };
  };
  entrance: {
    duration: number;
    ease: string;
    staggerDelay: number;
  };
}

export interface ParallaxLayer {
  speed: number;
  zIndex: number;
  opacity: number;
}
