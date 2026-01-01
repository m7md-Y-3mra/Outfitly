import { ButtonSize } from "./button.types";

// Size mapping
export const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-md",
  md: "px-6 py-3 text-base rounded-lg",
  lg: "px-10 py-7 text-lg rounded-full",
  xl: "px-12 py-4 text-xl rounded-full",
};

// Default styles for variants — NOW WITH CORRECT ORIGINAL COLORS
export const variantDefaults = {
  primary: {
    className: "hover:scale-110 hover:shadow-2xl group",
    style: {
      backgroundColor: "var(--input-background)", // #FAF1ED
      color: "var(--primary)", // #671425
    },
  },

  secondary: {
    className: "hover:scale-110 hover:shadow-2xl bg-transparent backdrop-blur-md",
    style: {
      border: "2px solid var(--input-background)", // #FAF1ED
      color: "var(--input-background)", // same original
      backgroundColor: "color-mix(in srgb, var(--input-background) 10%, transparent)",
    },
  },

  gradient: {
    className:
      "text-white hover:scale-110 hover:shadow-2xl bg-gradient-to-r from-[#671425] to-[#6A1526]",
    style: {},
  },

  ghost: {
    className: "hover:bg-transparent text-foreground",
    style: {},
  },

  category: {
    selectedClass:
      "bg-gradient-to-r from-[#671425] to-[#8B1D35] text-white shadow-lg shadow-[#671425]/30",

    unselectedClass:
      "bg-white dark:bg-[#2A2A30] text-[#4C1420] dark:text-white/80 " +
      "hover:bg-[var(--input-background)] dark:hover:bg-[#35353D] " +
      "border border-[var(--input-background)] dark:border-[#35353D]",
  },

  icon: {
    className: "bg-white/20 backdrop-blur-md hover:bg-white/30 text-foreground",
    style: {},
  },

  link: {
    className:
      // no padding, transparent, text-only
      "bg-transparent p-0 shadow-none hover:shadow-none " +
      "text-[var(--outfitly-primary)] " +
      "hover:text-[var(--outfitly-primary-hover)] " +
      "dark:hover:text-[var(--outfitly-primary-active)]",
    style: {},
  },
};
