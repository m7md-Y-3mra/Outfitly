"use client";

import { useTheme } from "next-themes";
import { useAbout } from "./hooks/useAbout";
import {
  ABOUT_CONTENT,
  FEATURES,
  STATS,
  ABOUT_GRADIENTS,
} from "./about.constants";

export function About() {
  const { theme } = useTheme();
  const { refs, setFeatureCardRef, setStatItemRef } = useAbout();
  const isDark = theme === "dark";
  const gradients = isDark ? ABOUT_GRADIENTS.dark : ABOUT_GRADIENTS.light;

  return (
    <section
      ref={refs.sectionRef}
      className="py-24 px-6 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{ background: gradients.section }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-tl from-[#FAF1ED]/10 via-transparent to-[#F2E8E3]/10 animate-gradient" />

      {/* Floating orbs */}
      <div
        className="floating-orb absolute top-1/4 left-0 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom right, rgba(250, 241, 237, 0.2), rgba(242, 232, 227, 0.1), transparent)",
        }}
      />
      <div
        className="floating-orb absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "linear-gradient(to top left, rgba(250, 241, 237, 0.15), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div ref={refs.headingRef} className="text-center mb-16">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent animate-gradient"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #FAF1ED, #F2E8E3, #FAF1ED)",
              backgroundSize: "200% auto",
            }}
          >
            {ABOUT_CONTENT.heading.title}
          </h2>
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto"
            style={{ color: "rgba(250, 241, 237, 0.9)" }}
          >
            {ABOUT_CONTENT.heading.subtitle}
          </p>
        </div>

        {/* Feature cards */}
        <div
          ref={refs.featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20"
        >
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                ref={setFeatureCardRef(index)}
                className="relative p-6 sm:p-8 rounded-3xl backdrop-blur-md border border-white/20 overflow-hidden group cursor-default"
                style={{
                  backgroundColor: "rgba(250, 241, 237, 0.1)",
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Card hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FAF1ED]/20 via-transparent to-[#F2E8E3]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Icon container */}
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-5 sm:mb-6"
                    style={{
                      background: "linear-gradient(135deg, #FAF1ED, #F2E8E3)",
                      boxShadow: "0 8px 24px rgba(103, 20, 37, 0.2)",
                    }}
                  >
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-[#671425]" />
                  </div>

                  <h3
                    className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4"
                    style={{ color: "#FAF1ED" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: "rgba(250, 241, 237, 0.85)" }}
                  >
                    {feature.description}
                  </p>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 rounded-bl-full opacity-20 bg-gradient-to-bl from-[#FAF1ED] to-transparent" />
              </div>
            );
          })}
        </div>

        {/* Stats section */}
        <div
          ref={refs.statsRef}
          className="relative rounded-3xl overflow-hidden"
          style={{
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
          }}
        >
          {/* Stats background */}
          <div
            className="absolute inset-0 animate-gradient transition-all duration-500"
            style={{
              background: gradients.stats,
              backgroundSize: "200% auto",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#671425]/10 via-transparent to-[#6A1526]/10" />

          <div className="relative z-10 px-6 sm:px-8 py-16 sm:py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {STATS.map((stat, index) => (
                <div
                  key={stat.label}
                  ref={setStatItemRef(index)}
                  className="text-center cursor-default"
                >
                  <div
                    className="stat-number text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 bg-clip-text text-transparent transition-all duration-300"
                    style={{
                      backgroundImage: gradients.text,
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="text-sm sm:text-base transition-colors duration-300"
                    style={{
                      color: isDark ? "#F2E8E3" : "#4C1420",
                      opacity: 0.8,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div ref={refs.ctaRef} className="mt-16 sm:mt-20 relative">
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
            }}
          >
            {/* CTA background */}
            <div
              className="absolute inset-0 backdrop-blur-md transition-all duration-500"
              style={{ background: gradients.cta }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#671425]/5 via-transparent to-[#6A1526]/5" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8 p-8 sm:p-10">
              <div className="flex-1 text-center md:text-left">
                <h3
                  className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 bg-clip-text text-transparent transition-all duration-300"
                  style={{
                    backgroundImage: gradients.text,
                  }}
                >
                  {ABOUT_CONTENT.cta.title}
                </h3>
                <p
                  className="text-sm sm:text-base transition-colors duration-300"
                  style={{
                    color: isDark ? "#F2E8E3" : "#4C1420",
                    opacity: 0.8,
                  }}
                >
                  {ABOUT_CONTENT.cta.subtitle}
                </p>
              </div>

              <button
                className="group relative px-8 sm:px-10 py-3 sm:py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 whitespace-nowrap"
                style={{
                  background: "linear-gradient(to right, #671425, #6A1526)",
                  color: "#FAF1ED",
                  boxShadow: "0 10px 30px rgba(103, 20, 37, 0.3)",
                }}
              >
                <span className="relative z-10 font-semibold">
                  {ABOUT_CONTENT.cta.button}
                </span>
                {/* Button hover effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(to right, #6A1526, #8B1D35)",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
