"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VIDEO_CONFIG, VIDEO_CONTENT } from "../video-section.constants";

gsap.registerPlugin(ScrollTrigger);

export function useVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const overlayTextRef = useRef<HTMLDivElement>(null);

  const [currentProgress, setCurrentProgress] = useState(0);
  const [activeTextIndex, setActiveTextIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const { entrance } = VIDEO_CONFIG;

      // Heading entrance animation
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

      // Desktop - Full scroll-synced video experience
      mm.add("(min-width: 1024px)", () => {
        // Wait for video metadata to load
        const setupScrollVideo = () => {
          if (!video.duration) return;

          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: VIDEO_CONFIG.scrubSmoothing,
            onUpdate: (self) => {
              const progress = self.progress;
              setCurrentProgress(progress);

              // Update video time based on scroll
              if (video.duration) {
                video.currentTime = progress * video.duration;
              }

              // Update progress bar
              if (progressRef.current) {
                gsap.to(progressRef.current, {
                  scaleX: progress,
                  duration: 0.1,
                });
              }

              // Determine active overlay text
              const texts = VIDEO_CONTENT.overlayTexts;
              let activeIndex = 0;
              for (let i = texts.length - 1; i >= 0; i--) {
                if (progress >= texts[i].progress - 0.1) {
                  activeIndex = i;
                  break;
                }
              }
              setActiveTextIndex(activeIndex);
            },
          });
        };

        if (video.readyState >= 1) {
          setupScrollVideo();
        } else {
          video.addEventListener("loadedmetadata", setupScrollVideo);
        }

        // Overlay text animations
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          onUpdate: (self) => {
            if (!overlayTextRef.current) return;
            const children = overlayTextRef.current.children;

            VIDEO_CONTENT.overlayTexts.forEach((item, index) => {
              const child = children[index] as HTMLElement;
              if (!child) return;

              const itemProgress = item.progress;
              const diff = Math.abs(self.progress - itemProgress);

              if (diff < 0.15) {
                const opacity = 1 - diff / 0.15;
                const scale = 0.8 + 0.2 * (1 - diff / 0.15);
                gsap.to(child, {
                  opacity,
                  scale,
                  duration: 0.2,
                });
              } else {
                gsap.to(child, {
                  opacity: 0,
                  scale: 0.8,
                  duration: 0.2,
                });
              }
            });
          },
        });
      });

      // Tablet - Simplified scroll video
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        const setupScrollVideo = () => {
          if (!video.duration) return;

          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 20%",
            end: "bottom 80%",
            scrub: 1,
            onUpdate: (self) => {
              if (video.duration) {
                video.currentTime = self.progress * video.duration;
              }
              setCurrentProgress(self.progress);
            },
          });
        };

        if (video.readyState >= 1) {
          setupScrollVideo();
        } else {
          video.addEventListener("loadedmetadata", setupScrollVideo);
        }
      });

      // Mobile - Auto-play video
      mm.add("(max-width: 767px)", () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => {
            video.play();
          },
          onLeave: () => {
            video.pause();
          },
          onEnterBack: () => {
            video.play();
          },
          onLeaveBack: () => {
            video.pause();
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return {
    sectionRef,
    containerRef,
    videoRef,
    headingRef,
    progressRef,
    overlayTextRef,
    currentProgress,
    activeTextIndex,
  };
}
