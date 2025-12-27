"use client";

import React, { Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Cloud, Palette, Edit3 } from "lucide-react";
import { useTranslations } from "next-intl";

import type { AIGeneratorFormData } from "./aiGenerator";
import SelectCard from "./selectCard";
import { OCCASIONS, STYLES, WEATHER } from "../constants/constatnts";

// Mapping from API values to translation keys
const OCCASION_KEYS: Record<string, string> = {
  "Work Meeting": "workMeeting",
  "Casual Hangout": "casualHangout",
  "Date Night": "dateNight",
  Wedding: "wedding",
  Party: "party",
  "Formal Event": "formalEvent",
  Other: "other",
};

const WEATHER_KEYS: Record<string, string> = {
  "Sunny & Hot": "sunnyHot",
  "Warm & Pleasant": "warmPleasant",
  "Cool & Breezy": "coolBreezy",
  "Cold & Windy": "coldWindy",
  Rainy: "rainy",
  Snowy: "snowy",
};

const STYLE_KEYS: Record<string, string> = {
  CASUAL: "casual",
  FORMAL: "formal",
  WORK: "work",
  SPORTY: "sporty",
  STREETWEAR: "streetwear",
  LOUNGEWEAR: "loungewear",
  PARTY: "party",
};

export interface IFormProps {
  formData: AIGeneratorFormData;
  customOccasion: string;
  onFormChange: Dispatch<SetStateAction<AIGeneratorFormData>>;
  onCustomOccasionChange: Dispatch<SetStateAction<string>>;
}

export function AIGeneratorFiltersForm({
  formData,
  customOccasion,
  onFormChange,
  onCustomOccasionChange,
}: IFormProps) {
  const t = useTranslations("AIGenerator");

  const setField = <K extends keyof AIGeneratorFormData>(key: K, value: AIGeneratorFormData[K]) => {
    onFormChange((prev) => {
      const next = { ...prev, [key]: value };

      if (key === "occasion" && value !== "Other") {
        onCustomOccasionChange("");
      }

      return next;
    });
  };

  const labelColor = "var(--outfitly-text-primary)";
  const iconBg = "var(--outfitly-bg-secondary)";
  const iconBorder = "var(--outfitly-border-light)";
  const iconColor = "var(--outfitly-text-secondary)";

  const fieldBg = "var(--outfitly-bg-tertiary, var(--outfitly-bg-secondary))";
  const fieldBorder = "var(--outfitly-border-light)";
  const fieldText = "var(--outfitly-text-primary)";
  const ring = "var(--outfitly-primary)";

  return (
    <div className="mt-8 space-y-8 relative z-10">
      {/* Occasion */}
      <section>
        <label className="block mb-4 flex items-center gap-2" style={{ color: labelColor }}>
          <span
            className="inline-flex h-6 w-6 items-center justify-center rounded-md border"
            style={{
              backgroundColor: iconBg,
              borderColor: iconBorder,
              color: iconColor,
            }}
          >
            <Briefcase className="h-4 w-4" />
          </span>
          <span>{t("form.occasionLabel")}</span>
        </label>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {OCCASIONS.map((o) => (
            <motion.button
              key={o.value}
              type="button"
              onClick={() => setField("occasion", o.value)}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SelectCard
                label={t(`occasions.${OCCASION_KEYS[o.value]}`)}
                Icon={o.icon}
                selected={formData.occasion === o.value}
              />
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {formData.occasion === "Other" && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                value={customOccasion}
                onChange={(e) => onCustomOccasionChange(e.target.value)}
                placeholder={t("form.customOccasionPlaceholder")}
                className="w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 focus:outline-none focus-visible:ring-2"
                style={{
                  backgroundColor: fieldBg,
                  borderColor: fieldBorder,
                  color: fieldText,
                  outlineColor: ring,
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Weather */}
      <section>
        <label className="block mb-4 flex items-center gap-2" style={{ color: labelColor }}>
          <span
            className="inline-flex h-6 w-6 items-center justify-center rounded-md border"
            style={{
              backgroundColor: iconBg,
              borderColor: iconBorder,
              color: iconColor,
            }}
          >
            <Cloud className="h-4 w-4" />
          </span>
          <span>{t("form.weatherLabel")}</span>
        </label>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {WEATHER.map((w) => (
            <motion.button
              key={w.value}
              type="button"
              onClick={() => setField("weather", w.value)}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SelectCard
                label={t(`weather.${WEATHER_KEYS[w.value]}`)}
                Icon={w.icon}
                selected={formData.weather === w.value}
              />
            </motion.button>
          ))}
        </div>
      </section>

      {/* Style */}
      <section>
        <label className="block mb-4 flex items-center gap-2" style={{ color: labelColor }}>
          <span
            className="inline-flex h-6 w-6 items-center justify-center rounded-md border"
            style={{
              backgroundColor: iconBg,
              borderColor: iconBorder,
              color: iconColor,
            }}
          >
            <Palette className="h-4 w-4" />
          </span>
          <span>{t("form.styleLabel")}</span>
        </label>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {STYLES.map((s) => (
            <motion.button
              key={s.value}
              type="button"
              onClick={() => setField("style", s.value)}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SelectCard
                label={t(`styles.${STYLE_KEYS[s.value]}`)}
                Icon={s.icon}
                selected={formData.style === s.value}
              />
            </motion.button>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section>
        <label className="block mb-3 flex items-center gap-2" style={{ color: labelColor }}>
          <span
            className="inline-flex h-6 w-6 items-center justify-center rounded-md border"
            style={{
              backgroundColor: iconBg,
              borderColor: iconBorder,
              color: iconColor,
            }}
          >
            <Edit3 className="h-4 w-4" />
          </span>

          <span>
            {t("form.requirementsLabel")}{" "}
            <span style={{ opacity: 0.7 }}>{t("form.requirementsOptional")}</span>
          </span>
        </label>

        <textarea
          rows={3}
          value={formData.requirements}
          onChange={(e) => setField("requirements", e.target.value)}
          placeholder={t("form.requirementsPlaceholder")}
          className="w-full px-4 py-3 rounded-xl border-2 resize-none transition-all duration-300 focus:outline-none focus-visible:ring-2"
          style={{
            backgroundColor: fieldBg,
            borderColor: fieldBorder,
            color: fieldText,
            outlineColor: ring,
          }}
        />
      </section>
    </div>
  );
}
