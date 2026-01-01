"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TESTIMONIALS_CONFIG } from "../testimonials.constants";

gsap.registerPlugin(ScrollTrigger);

export function useTestimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const animation1Ref = useRef<gsap.core.Tween | null>(null);
  const animation2Ref = useRef<gsap.core.Tween | null>(null);

  // Infinite scroll animation
  useEffect(() => {
    const track1 = track1Ref.current;
    const track2 = track2Ref.current;
    if (!track1 || !track2) return;

    const ctx = gsap.context(() => {
      // Get track width for seamless loop
      const track1Width = track1.scrollWidth / 2;
      const track2Width = track2.scrollWidth / 2;

      // Track 1 - scrolls left
      animation1Ref.current = gsap.to(track1, {
        x: -track1Width,
        duration: track1Width / TESTIMONIALS_CONFIG.scrollSpeed,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % track1Width),
        },
      });

      // Track 2 - scrolls right (starts from negative)
      gsap.set(track2, { x: -track2Width });
      animation2Ref.current = gsap.to(track2, {
        x: 0,
        duration: track2Width / TESTIMONIALS_CONFIG.scrollSpeed,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const val = parseFloat(x);
            return val >= 0 ? val - track2Width : val;
          }),
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Pause/resume animations
  useEffect(() => {
    if (isPaused) {
      animation1Ref.current?.pause();
      animation2Ref.current?.pause();
    } else {
      animation1Ref.current?.resume();
      animation2Ref.current?.resume();
    }
  }, [isPaused]);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const { entrance } = TESTIMONIALS_CONFIG;

      // Heading entrance
      gsap.set(headingRef.current, { opacity: 0, y: 50 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(headingRef.current, {
            opacity: 1,
            y: 0,
            duration: entrance.duration,
            ease: entrance.ease,
          });
        },
      });

      // Track entrance with stagger
      gsap.set([track1Ref.current, track2Ref.current], {
        opacity: 0,
        y: 30,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.to([track1Ref.current, track2Ref.current], {
            opacity: 1,
            y: 0,
            duration: entrance.duration,
            ease: entrance.ease,
            stagger: 0.2,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Card hover handlers
  const handleCardHover = useCallback((index: number) => {
    setIsPaused(true);
    setHoveredCard(index);

    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      scale: 1.05,
      rotateY: 5,
      rotateX: -5,
      z: 50,
      boxShadow: "0 25px 50px rgba(103, 20, 37, 0.3)",
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleCardLeave = useCallback((index: number) => {
    setIsPaused(false);
    setHoveredCard(null);

    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      z: 0,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  // 3D tilt effect on mouse move
  const handleCardMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, index: number) => {
      if (hoveredCard !== index) return;

      const card = cardsRef.current[index];
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateY = (mouseX / (rect.width / 2)) * TESTIMONIALS_CONFIG.cardRotation;
      const rotateX = (mouseY / (rect.height / 2)) * -TESTIMONIALS_CONFIG.cardRotation;

      gsap.to(card, {
        rotateY: rotateY,
        rotateX: rotateX,
        duration: 0.2,
        ease: "power1.out",
      });
    },
    [hoveredCard],
  );

  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardsRef.current[index] = el;
    },
    [],
  );

  return {
    sectionRef,
    headingRef,
    track1Ref,
    track2Ref,
    isPaused,
    hoveredCard,
    handleCardHover,
    handleCardLeave,
    handleCardMouseMove,
    setCardRef,
  };
}
