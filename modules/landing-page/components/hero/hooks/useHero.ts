"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroRefs } from "../hero.types";
import { HERO_ANIMATION_CONFIG, FLOATING_ELEMENTS } from "../hero.constants";

gsap.registerPlugin(ScrollTrigger);

export function useHero() {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const card3DRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  const refs: HeroRefs = {
    containerRef,
    headingRef,
    subheadingRef,
    badgeRef,
    ctaRef,
    featuresRef,
    scrollIndicatorRef,
    floatingElementsRef,
    card3DRef,
  };

  // 3D tilt effect on mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current || !card3DRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    mousePosition.current = {
      x: (mouseX / (rect.width / 2)) * 15,
      y: (mouseY / (rect.height / 2)) * -10,
    };

    // Animate 3D card with smooth interpolation
    gsap.to(card3DRef.current, {
      rotateY: mousePosition.current.x,
      rotateX: mousePosition.current.y,
      duration: 0.5,
      ease: "power2.out",
    });

    // Parallax effect on floating elements
    floatingElementsRef.current.forEach((el, index) => {
      if (!el) return;
      const depth = FLOATING_ELEMENTS[index]?.initialPosition.z || 50;
      const parallaxFactor = depth / 100;

      gsap.to(el, {
        x: `+=${mouseX * parallaxFactor * 0.05}`,
        y: `+=${mouseY * parallaxFactor * 0.05}`,
        duration: 0.3,
        ease: "power1.out",
      });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!card3DRef.current) return;

    gsap.to(card3DRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  // Initialize entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const { duration, ease, staggerDelay } = HERO_ANIMATION_CONFIG;

      // Set initial states
      gsap.set(
        [
          badgeRef.current,
          headingRef.current,
          subheadingRef.current,
          ctaRef.current,
          featuresRef.current,
          scrollIndicatorRef.current,
        ],
        {
          opacity: 0,
          y: 60,
        }
      );

      gsap.set(card3DRef.current, {
        opacity: 0,
        scale: 0.8,
        rotateY: -30,
        transformPerspective: 1000,
      });

      // Set floating elements initial state
      floatingElementsRef.current.forEach((el, index) => {
        if (!el) return;
        const config = FLOATING_ELEMENTS[index];
        gsap.set(el, {
          opacity: 0,
          scale: 0,
          x: config?.initialPosition.x || 0,
          y: config?.initialPosition.y || 0,
          rotateX: gsap.utils.random(-180, 180),
          rotateY: gsap.utils.random(-180, 180),
          transformPerspective: 800,
        });
      });

      // Create master timeline
      const tl = gsap.timeline({
        defaults: { ease, duration: duration * 0.8 },
      });

      // Badge animation
      tl.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: duration * 0.6,
      });

      // Heading animation with split text effect
      tl.to(
        headingRef.current,
        {
          opacity: 1,
          y: 0,
          duration,
        },
        "-=0.4"
      );

      // 3D Card entrance
      tl.to(
        card3DRef.current,
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: duration * 1.2,
          ease: "back.out(1.5)",
        },
        "-=0.6"
      );

      // Subheading
      tl.to(
        subheadingRef.current,
        {
          opacity: 1,
          y: 0,
        },
        "-=0.5"
      );

      // CTA buttons
      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
        },
        "-=0.4"
      );

      // Features
      tl.to(
        featuresRef.current,
        {
          opacity: 1,
          y: 0,
        },
        "-=0.3"
      );

      // Scroll indicator
      tl.to(
        scrollIndicatorRef.current,
        {
          opacity: 1,
          y: 0,
          duration: duration * 0.5,
        },
        "-=0.2"
      );

      // Floating elements staggered entrance
      floatingElementsRef.current.forEach((el, index) => {
        if (!el) return;
        const config = FLOATING_ELEMENTS[index];

        gsap.to(el, {
          opacity: 0.9,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          duration: 1.5,
          delay: 0.8 + (config?.animationDelay || 0) * 0.3,
          ease: "elastic.out(1, 0.5)",
        });

        // Continuous floating animation
        gsap.to(el, {
          y: `+=${gsap.utils.random(20, 40)}`,
          rotateY: `+=${config?.rotationAxis === "y" ? 360 : 0}`,
          rotateX: `+=${config?.rotationAxis === "x" ? 360 : 0}`,
          rotateZ: `+=${config?.rotationAxis === "z" ? 360 : 0}`,
          duration: gsap.utils.random(4, 6),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: config?.animationDelay || 0,
        });
      });

      // Scroll-triggered parallax
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Parallax on heading
          gsap.to(headingRef.current, {
            y: progress * 100,
            opacity: 1 - progress * 0.5,
            duration: 0.1,
          });

          // Scale down 3D card on scroll
          gsap.to(card3DRef.current, {
            scale: 1 - progress * 0.2,
            rotateX: progress * 10,
            duration: 0.1,
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse move effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  // Add scroll indicator bounce animation
  useEffect(() => {
    if (!scrollIndicatorRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  const setFloatingElementRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      floatingElementsRef.current[index] = el;
    },
    []
  );

  return {
    refs,
    setFloatingElementRef,
  };
}
