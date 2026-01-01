"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

const RTL_LOCALES = ["ar", "he", "fa", "ur"];

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const isRTL = RTL_LOCALES.includes(locale);
  const dir = isRTL ? "rtl" : "ltr";

  useEffect(() => {
    // Set dir and lang on the html element
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;

    // Add RTL class for additional styling if needed
    if (isRTL) {
      document.documentElement.classList.add("rtl");
    } else {
      document.documentElement.classList.remove("rtl");
    }
  }, [dir, locale, isRTL]);

  return <>{children}</>;
}
