import { RefObject } from "react";
import { LucideIcon } from "lucide-react";

export interface PinnedFeaturesRefs {
  sectionRef: RefObject<HTMLElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  featurePanelsRef: RefObject<(HTMLDivElement | null)[]>;
  featureImagesRef: RefObject<(HTMLDivElement | null)[]>;
  progressRef: RefObject<HTMLDivElement | null>;
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  color: string;
}

export interface PinnedAnimationConfig {
  scrollDistance: string;
  featureTransition: number;
  maskReveal: {
    duration: number;
    ease: string;
  };
  entrance: {
    duration: number;
    ease: string;
  };
}
