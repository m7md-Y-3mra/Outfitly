"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PinnedFeaturesRefs } from "../about.types";
import { PINNED_ANIMATION_CONFIG, FEATURES } from "../about.constants";

gsap.registerPlugin(ScrollTrigger);

export function usePinnedFeatures() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const featurePanelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const featureImagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  const [activeFeature, setActiveFeature] = useState(0);

  const refs: PinnedFeaturesRefs = {
    sectionRef,
    containerRef,
    featurePanelsRef,
    featureImagesRef,
    progressRef,
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const { entrance, maskReveal } = PINNED_ANIMATION_CONFIG;
      const featureCount = FEATURES.length;

      // Desktop - Full pinned experience
      mm.add("(min-width: 1024px)", () => {
        featurePanelsRef.current.forEach((panel, index) => {
          if (!panel) return;
          gsap.set(panel, {
            opacity: index === 0 ? 1 : 0,
            y: index === 0 ? 0 : 50,
          });
        });

        featureImagesRef.current.forEach((image, index) => {
          if (!image) return;
          gsap.set(image, {
            clipPath:
              index === 0
                ? "circle(100% at 50% 50%)"
                : "circle(0% at 50% 50%)",
            scale: index === 0 ? 1 : 1.2,
          });
        });

        // Main pinned section
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 3}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const currentFeature = Math.min(
              Math.floor(progress * featureCount),
              featureCount - 1
            );

            // Update active feature state
            setActiveFeature(currentFeature);

            // Animate feature transitions
            featurePanelsRef.current.forEach((panel, index) => {
              if (!panel) return;

              if (index === currentFeature) {
                gsap.to(panel, {
                  opacity: 1,
                  y: 0,
                  duration: 0.3,
                });
              } else {
                gsap.to(panel, {
                  opacity: 0,
                  y: index < currentFeature ? -30 : 30,
                  duration: 0.3,
                });
              }
            });

            // Animate image mask reveals
            featureImagesRef.current.forEach((image, index) => {
              if (!image) return;

              if (index === currentFeature) {
                gsap.to(image, {
                  clipPath: "circle(100% at 50% 50%)",
                  scale: 1,
                  duration: maskReveal.duration,
                  ease: maskReveal.ease,
                });
              } else if (index < currentFeature) {
                gsap.to(image, {
                  clipPath: "circle(150% at 50% 50%)",
                  scale: 0.9,
                  duration: 0.5,
                });
              } else {
                gsap.to(image, {
                  clipPath: "circle(0% at 50% 50%)",
                  scale: 1.2,
                  duration: 0.5,
                });
              }
            });

            // Progress indicator
            if (progressRef.current) {
              gsap.to(progressRef.current, {
                scaleY: progress,
                duration: 0.1,
              });
            }
          },
        });
      });

      // Tablet - Simplified animations
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        featurePanelsRef.current.forEach((panel, index) => {
          if (!panel) return;

          gsap.fromTo(
            panel,
            { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        featureImagesRef.current.forEach((image) => {
          if (!image) return;

          gsap.fromTo(
            image,
            { clipPath: "circle(0% at 50% 50%)", scale: 1.1 },
            {
              clipPath: "circle(100% at 50% 50%)",
              scale: 1,
              duration: 1,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: image,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });

      // Mobile - Simple reveals
      mm.add("(max-width: 767px)", () => {
        featurePanelsRef.current.forEach((panel, index) => {
          if (!panel) return;

          gsap.fromTo(
            panel,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setFeaturePanelRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      featurePanelsRef.current[index] = el;
    },
    []
  );

  const setFeatureImageRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      featureImagesRef.current[index] = el;
    },
    []
  );

  return {
    refs,
    activeFeature,
    setFeaturePanelRef,
    setFeatureImageRef,
  };
}
