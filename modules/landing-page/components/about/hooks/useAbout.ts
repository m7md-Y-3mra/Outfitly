"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AboutRefs } from "../about.types";
import { ABOUT_ANIMATION_CONFIG, FEATURES, STATS } from "../about.constants";

gsap.registerPlugin(ScrollTrigger);

export function useAbout() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const statItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);

  const refs: AboutRefs = {
    sectionRef,
    headingRef,
    featuresRef,
    featureCardsRef,
    statsRef,
    statItemsRef,
    ctaRef,
  };

  // Initialize scroll-triggered animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const { duration, ease, staggerDelay } = ABOUT_ANIMATION_CONFIG;

      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration,
          ease,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Feature cards staggered animation with 3D effect
      featureCardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            rotateX: 15,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: duration * 1.2,
            ease: "back.out(1.2)",
            delay: index * staggerDelay,
            scrollTrigger: {
              trigger: featuresRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover animation setup
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.03,
            y: -8,
            boxShadow: "0 25px 60px rgba(250, 241, 237, 0.25)",
            duration: 0.4,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
            duration: 0.4,
            ease: "power2.out",
          });
        });
      });

      // Stats section animation
      gsap.fromTo(
        statsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration,
          ease,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Stat items counter animation
      statItemsRef.current.forEach((item, index) => {
        if (!item) return;

        const numberEl = item.querySelector(".stat-number");
        if (!numberEl) return;

        gsap.fromTo(
          item,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.15,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Hover effect for stats
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // CTA section animation
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration,
          ease,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Floating orbs parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const orbs = sectionRef.current?.querySelectorAll(".floating-orb");
          orbs?.forEach((orb, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            gsap.to(orb, {
              y: self.progress * 100 * direction,
              x: self.progress * 50 * direction,
              duration: 0.1,
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setFeatureCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      featureCardsRef.current[index] = el;
    },
    []
  );

  const setStatItemRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      statItemsRef.current[index] = el;
    },
    []
  );

  return {
    refs,
    setFeatureCardRef,
    setStatItemRef,
  };
}
