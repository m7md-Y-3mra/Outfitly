"use client";

import { useTheme } from "../../contexts/ThemeContext";

export function usePageHeader() {
  const { theme } = useTheme();

  return {
    isDark: theme === "dark",
  };
}
