import { ButtonSize } from "./types";

// Size mapping
export const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-md",
  md: "px-6 py-3 text-base rounded-lg",
  lg: "px-10 py-7 text-lg rounded-full",
  xl: "px-12 py-4 text-xl rounded-full",
};

// Default styles for variants
export const variantDefaults = {
  primary: {
    className: "hover:scale-110 hover:shadow-2xl group",
    style: { backgroundColor: "#FAF1ED", color: "#671425" },
  },
  secondary: {
    className: "hover:scale-110 hover:shadow-2xl bg-transparent backdrop-blur-md",
    style: {
      border: "2px solid #FAF1ED",
      color: "#FAF1ED",
      backgroundColor: "rgba(250, 241, 237, 0.1)",
    },
  },
  gradient: {
    className: "bg-gradient-to-r from-[#671425] to-[#6A1526] text-white hover:scale-110 hover:shadow-2xl",
    style: {},
  },
  ghost: {
    className: "hover:bg-transparent",
    style: {},
  },
  category: {
    selectedClass:
      "bg-gradient-to-r from-[#671425] to-[#8B1D35] text-white shadow-lg shadow-[#671425]/30",
    unselectedClass:
      "bg-white dark:bg-[#2A2A30] text-[#4C1420] dark:text-white/80 hover:bg-[#F2E8E3] dark:hover:bg-[#35353D] border border-[#F2E8E3] dark:border-[#35353D]",
  },
  icon: {
    className: "bg-white/20 backdrop-blur-md hover:bg-white/30",
    style: {},
  },
};
