import { RefObject } from "react";

export interface VideoSectionRefs {
  sectionRef: RefObject<HTMLElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  headingRef: RefObject<HTMLDivElement | null>;
  progressRef: RefObject<HTMLDivElement | null>;
  overlayTextRef: RefObject<HTMLDivElement | null>;
}

export interface VideoSectionConfig {
  scrubSmoothing: number;
  entrance: {
    duration: number;
    ease: string;
  };
}
