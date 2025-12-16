"use client";
import { DEFAULT_OCCASIONS, DEFAULT_STYLES, DEFAULT_WEATHER } from "../constants";
import type { AIGeneratorFormData } from "./aiGenerator";

export interface IFormProps  {
  formData: AIGeneratorFormData;
  customOccasion: string;
  onFormChange: (next: AIGeneratorFormData) => void;
  onCustomOccasionChange: (value: string) => void;
};


export function AIGeneratorFiltersForm({
  formData,
  customOccasion,
  onFormChange,
  onCustomOccasionChange,
}: IFormProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6 relative z-10">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Occasion
        </label>
        <select
          value={formData.occasion}
          onChange={(e) => onFormChange({ ...formData, occasion: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-blue-500 focus:outline-none"
        >
          <option value="">Select occasion</option>
          {DEFAULT_OCCASIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Weather
        </label>
        <select
          value={formData.weather}
          onChange={(e) => onFormChange({ ...formData, weather: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-blue-500 focus:outline-none"
        >
          <option value="">Select weather</option>
          {DEFAULT_WEATHER.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Style
        </label>
        <select
          value={formData.style}
          onChange={(e) => onFormChange({ ...formData, style: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-blue-500 focus:outline-none"
        >
          <option value="">Select style</option>
          {DEFAULT_STYLES.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {formData.occasion === "Other" && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Custom Occasion
          </label>
          <input
            type="text"
            value={customOccasion}
            onChange={(e) => onCustomOccasionChange(e.target.value)}
            placeholder="e.g., Beach wedding"
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-blue-500 focus:outline-none"
          />
        </div>
      )}
    </div>
  );
}
