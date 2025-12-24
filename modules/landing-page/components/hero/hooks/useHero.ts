"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_ANIMATION_CONFIG, PARALLAX_LAYERS } from "../hero.constants";
import { splitText } from "../../../utils/splitText";

gsap.registerPlugin(ScrollTrigger);

export function useHero() {
  const containerRef = useRef<HTMLElement>(null);
  const headingLine1Ref = useRef<HTMLSpanElement>(null);
  const headingLine2Ref = useRef<HTMLSpanElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const parallaxLayer1Ref = useRef<HTMLDivElement>(null);
  const parallaxLayer2Ref = useRef<HTMLDivElement>(null);
  const parallaxLayer3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Early return if container is not mounted
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const { splitText: splitConfig, entrance } = HERO_ANIMATION_CONFIG;
      const mm = gsap.matchMedia();

      // Filter out null refs for batch animations
      const nonTextElements = [
        badgeRef.current,
        subheadingRef.current,
        ctaRef.current,
        featuresRef.current,
        scrollIndicatorRef.current,
      ].filter(Boolean);

      // Set initial states for non-text elements
      if (nonTextElements.length > 0) {
        gsap.set(nonTextElements, {
          opacity: 0,
          y: 40,
        });
      }

      // Split text animations
      let line1Chars: HTMLElement[] = [];
      let line2Chars: HTMLElement[] = [];

      if (headingLine1Ref.current) {
        const result = splitText(headingLine1Ref.current, "chars");
        line1Chars = result.elements;

        gsap.set(line1Chars, {
          opacity: 0,
          y: 80,
          rotateX: -90,
          transformOrigin: "50% 50% -50px",
        });
      }

      if (headingLine2Ref.current) {
        const result = splitText(headingLine2Ref.current, "chars");
        line2Chars = result.elements;

        gsap.set(line2Chars, {
          opacity: 0,
          y: 80,
          rotateX: -90,
          scale: 0.8,
          transformOrigin: "50% 50% -50px",
        });
      }

      // Master entrance timeline
      const entranceTl = gsap.timeline({
        defaults: { ease: entrance.ease },
      });

      // Badge fade in
      if (badgeRef.current) {
        entranceTl.to(badgeRef.current, {
          opacity: 1,
          y: 0,
          duration: entrance.duration * 0.5,
        });
      }

      // Line 1 character animation - 3D flip reveal
      if (line1Chars.length > 0) {
        entranceTl.to(
          line1Chars,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: splitConfig.duration,
            stagger: splitConfig.charStagger,
            ease: "back.out(1.7)",
          },
          "-=0.2",
        );
      }

      // Line 2 character animation - scale and flip
      if (line2Chars.length > 0) {
        entranceTl.to(
          line2Chars,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: splitConfig.duration * 1.2,
            stagger: {
              each: splitConfig.charStagger,
              from: "center",
            },
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.5",
        );
      }

      // Subheading
      if (subheadingRef.current) {
        entranceTl.to(
          subheadingRef.current,
          {
            opacity: 1,
            y: 0,
            duration: entrance.duration * 0.8,
          },
          "-=0.6",
        );
      }

      // CTA buttons
      if (ctaRef.current) {
        entranceTl.to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: entrance.duration * 0.8,
          },
          "-=0.5",
        );
      }

      // Features
      if (featuresRef.current) {
        entranceTl.to(
          featuresRef.current,
          {
            opacity: 1,
            y: 0,
            duration: entrance.duration * 0.8,
          },
          "-=0.4",
        );
      }

      // Scroll indicator with bounce
      if (scrollIndicatorRef.current) {
        entranceTl.to(
          scrollIndicatorRef.current,
          {
            opacity: 1,
            y: 0,
            duration: entrance.duration * 0.5,
          },
          "-=0.3",
        );

        // Continuous scroll indicator bounce
        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: entrance.duration * 2,
        });
      }

      // Parallax scroll effects - Desktop only
      mm.add("(min-width: 1024px)", () => {
        const parallaxLayers = [
          { ref: parallaxLayer1Ref, index: 0 },
          { ref: parallaxLayer2Ref, index: 1 },
          { ref: parallaxLayer3Ref, index: 2 },
        ];

        parallaxLayers.forEach(({ ref, index }) => {
          if (!ref.current) return;
          const config = PARALLAX_LAYERS[index];

          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
            onUpdate: (self) => {
              if (ref.current) {
                gsap.to(ref.current, {
                  y: self.progress * 200 * config.speed,
                  duration: 0.1,
                });
              }
            },
          });
        });

        // Heading parallax on scroll
        const headingElements = [headingLine1Ref.current, headingLine2Ref.current].filter(Boolean);

        const otherElements = [
          badgeRef.current,
          subheadingRef.current,
          ctaRef.current,
          featuresRef.current,
        ].filter(Boolean);

        if (headingElements.length > 0 || otherElements.length > 0) {
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;

              // Move heading up and fade
              if (headingElements.length > 0) {
                gsap.to(headingElements, {
                  y: progress * 150,
                  opacity: 1 - progress * 0.7,
                  duration: 0.1,
                });
              }

              // Scale down other elements
              if (otherElements.length > 0) {
                gsap.to(otherElements, {
                  y: progress * 100,
                  opacity: 1 - progress * 0.5,
                  scale: 1 - progress * 0.1,
                  duration: 0.1,
                });
              }
            },
          });
        }
      });

      // Tablet parallax - reduced intensity
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        const headingElements = [headingLine1Ref.current, headingLine2Ref.current].filter(Boolean);

        if (headingElements.length > 0) {
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;

              gsap.to(headingElements, {
                y: progress * 80,
                opacity: 1 - progress * 0.5,
                duration: 0.1,
              });
            },
          });
        }
      });

      // Mobile - minimal parallax
      mm.add("(max-width: 767px)", () => {
        const headingElements = [headingLine1Ref.current, headingLine2Ref.current].filter(Boolean);

        if (headingElements.length > 0) {
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;

              gsap.to(headingElements, {
                y: progress * 40,
                opacity: 1 - progress * 0.3,
                duration: 0.1,
              });
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return {
    containerRef,
    headingLine1Ref,
    headingLine2Ref,
    subheadingRef,
    badgeRef,
    ctaRef,
    featuresRef,
    scrollIndicatorRef,
    parallaxLayer1Ref,
    parallaxLayer2Ref,
    parallaxLayer3Ref,
  };
}
