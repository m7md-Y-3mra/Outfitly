"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Globe, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAVBAR_COLORS } from "./navbar.constants";

const LANGUAGE_NAMESEn: Record<string, { native: string }> = {
  en: { native: "English" },
  ar: { native: "Arabic" },
};

const LANGUAGE_NAMESAr: Record<string, { native: string }> = {
  en: { native: "الإنجليزية" },
  ar: { native: "العربية" },
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  const LANGUAGE_NAMES = locale === "en" ? LANGUAGE_NAMESEn : LANGUAGE_NAMESAr;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 hover:bg-primary/5"
        style={{
          backgroundColor: "color-mix(in srgb, var(--outfitly-primary) 6%, transparent)",
          border: `1px solid ${NAVBAR_COLORS.borderMedium}`,
        }}
        aria-label={t("switchLanguage")}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{LANGUAGE_NAMES[locale]?.native}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="absolute top-full mt-2 right-0 min-w-40 rounded-xl shadow-xl overflow-hidden z-50"
              style={{
                backgroundColor: NAVBAR_COLORS.bgPrimary,
                border: `1px solid ${NAVBAR_COLORS.borderMedium}`,
              }}
            >
              <div className="p-1">
                {routing.locales.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => handleLocaleChange(loc)}
                    className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-primary/5"
                    style={{ color: NAVBAR_COLORS.link }}
                  >
                    <span className="flex items-center gap-2">{LANGUAGE_NAMES[loc]?.native}</span>
                    {locale === loc && (
                      <Check className="w-4 h-4" style={{ color: NAVBAR_COLORS.primary }} />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
