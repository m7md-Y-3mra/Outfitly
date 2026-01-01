"use client";

import { useTheme } from "next-themes";

export function usePageHeader() {
  const { theme } = useTheme();

  return {
    isDark: theme === "dark",
  };
}
