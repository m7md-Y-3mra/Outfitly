"use client";

import { useTheme } from "next-themes";
import { usePinnedFeatures } from "./hooks/useAbout";
import { FEATURES, PINNED_GRADIENTS } from "./about.constants";
import Image from "next/image";

export function About() {
  const { theme } = useTheme();
  const {
    sectionRef,
    containerRef,
    progressRef,
    activeFeature,
    setFeaturePanelRef,
    setFeatureImageRef,
  } = usePinnedFeatures();
  const isDark = theme === "dark";
  const gradients = isDark ? PINNED_GRADIENTS.dark : PINNED_GRADIENTS.light;

  return (
    <section ref={sectionRef} className="relative">
      {/* Pinned Features Container */}
      <div
        ref={containerRef}
        className="relative min-h-screen"
        style={{ background: gradients.section }}
      >
        {/* Progress Indicator - Desktop only */}
        <div className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-50">
          <div className="relative h-32 w-1 bg-white/20 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="absolute bottom-0 left-0 w-full bg-[#FAF1ED] rounded-full origin-bottom"
              style={{ transform: "scaleY(0)" }}
            />
          </div>
          <div className="mt-4 space-y-2">
            {FEATURES.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeFeature === index ? "bg-[#FAF1ED] scale-125" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="hidden lg:block max-w-7xl mx-auto px-6 py-16 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen">
            {/* Left: Feature Content */}
            <div className="relative lg:h-[60vh] flex items-center">
              <div className="relative w-full">
                {FEATURES.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.title}
                      ref={setFeaturePanelRef(index)}
                      className={`${
                        index === 0 ? "relative" : "absolute inset-0"
                      } lg:absolute lg:inset-0`}
                    >
                      <div className="space-y-6">
                        {/* Icon */}
                        <div
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center"
                          style={{
                            background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
                            boxShadow: `0 8px 32px ${feature.color}40`,
                          }}
                        >
                          <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#671425]" />
                        </div>

                        {/* Title */}
                        <h3
                          className="text-3xl sm:text-4xl lg:text-5xl font-bold"
                          style={{ color: "#FAF1ED" }}
                        >
                          {feature.title}
                        </h3>

                        {/* Description */}
                        <p
                          className="text-lg sm:text-xl leading-relaxed max-w-lg"
                          style={{ color: "rgba(250, 241, 237, 0.85)" }}
                        >
                          {feature.description}
                        </p>

                        {/* Feature number */}
                        <div
                          className="text-8xl sm:text-9xl font-bold absolute -right-4 -top-8 opacity-10 pointer-events-none select-none hidden lg:block"
                          style={{ color: "#FAF1ED" }}
                        >
                          0{index + 1}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Feature Images with Mask Effect */}
            <div className="relative h-[50vh] lg:h-[70vh] rounded-3xl overflow-hidden">
              {FEATURES.map((feature, index) => (
                <div
                  key={`image-${index}`}
                  ref={setFeatureImageRef(index)}
                  className="absolute inset-0"
                  style={{
                    clipPath: index === 0 ? "circle(100% at 50% 50%)" : "circle(0% at 50% 50%)",
                    // zIndex: FEATURES.length - index,
                  }}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                    fill
                    objectFit="cover"
                  />
                  {/* Overlay gradient */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${gradients.overlay} 0%, transparent 50%)`,
                    }}
                  />
                </div>
              ))}

              {/* Decorative frame */}
              <div className="absolute inset-4 border-2 border-white/20 rounded-2xl pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Show all features in a grid */}
        <div className="lg:hidden px-6 py-16 space-y-12">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={`mobile-${feature.title}`}
                ref={setFeaturePanelRef(index + FEATURES.length)}
                className="relative"
              >
                {/* Image */}
                <div
                  ref={setFeatureImageRef(index + FEATURES.length)}
                  className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-6"
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                    fill
                    objectFit="cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, ${gradients.overlay}, transparent)`,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
                    }}
                  >
                    <Icon className="w-7 h-7 text-[#671425]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold" style={{ color: "#FAF1ED" }}>
                    {feature.title}
                  </h3>
                  <p
                    className="text-base sm:text-lg leading-relaxed"
                    style={{ color: "rgba(250, 241, 237, 0.85)" }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
