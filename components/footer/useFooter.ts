//import { useTheme } from "../contexts/ThemeContext";

export const useFooter = () => {
  //const { theme } = useTheme();
  // const isDark = theme === "dark";
  const isDark = "dark";
  return {
    isDark,
    colors: {
      primary: "var(--outfitly-primary)",
      primaryHover: "var(--outfitly-primary-hover)",
      primaryActive: "var(--outfitly-primary-active)",
      bgPrimary: "var(--outfitly-bg-primary)",
      bgSecondary: "var(--outfitly-bg-secondary)",
      textPrimary: "var(--outfitly-text-primary)",
      textSecondary: "var(--outfitly-text-secondary)",
      accent: "var(--outfitly-accent)",
      border: "var(--outfitly-border-light)",
    },
  };
};
