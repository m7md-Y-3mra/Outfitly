"use client";

import { useCallback, useMemo, useState } from "react";
import type { AIOutfitResponse, IItemsForAI } from "../types/generator.types";
import type {
  AIGeneratorFormData,
  IGeneratedOutfit,
  IOutfitForModal,
} from "../components/aiGenerator";
import {
  createPrompt,
  getItemsByIds,
  toGeneratedOutfits,
  toUserRequirements,
  transfromAIResponse,
} from "../ai.utils";
import {
  createOutfitAction,
  generateAIOutfitAction,
  getItemsForGeneratorAction,
  getOccasionsForAIAction,
} from "../generator.actions";
import { useAuth } from "@/providers/auth/auth.provider";
import { toast } from "sonner";
import { useTheme } from "next-themes";

export function useAIGenerator() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [formData, setFormData] = useState<AIGeneratorFormData>({
    occasion: "",
    weather: "",
    style: "",
    requirements: "",
  });
  const isDark = theme === "dark";

  const [customOccasion, setCustomOccasion] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [generatedOutfits, setGeneratedOutfits] = useState<IGeneratedOutfit[]>([]);
  const [viewingOutfit, setViewingOutfit] = useState<IOutfitForModal | null>(null);
  const [filteredFromDB, setFilteredFromDB] = useState<IItemsForAI[] | null>(null);
  const [aiResults, setAIResults] = useState<AIOutfitResponse[]>([]);
  const canGenerate = useMemo(() => {
    return Boolean(
      formData.occasion &&
      formData.weather &&
      formData.style &&
      (formData.occasion !== "Other" || customOccasion.trim()),
    );
  }, [formData.occasion, formData.weather, formData.style, customOccasion]);
  console.log(filteredFromDB);
  const open = Boolean(viewingOutfit);

  const handleGenerate = async () => {
    if (!canGenerate || isGenerating || !user) return;

    setIsGenerating(true);
    setShowResults(false);

    const [itemsRes, occasionsRes] = await Promise.all([
      getItemsForGeneratorAction({ style: formData.style, weather: formData.weather }, user.id),
      getOccasionsForAIAction(),
    ]);
    console.log(itemsRes);
    if (!itemsRes.success || !occasionsRes.success) {
      setIsGenerating(false);
      return;
    }

    const items = itemsRes.data;
    const occasions = occasionsRes.data;
    console.log(items);
    setFilteredFromDB(items);

    const userReqs = toUserRequirements(formData);
    const prompt = createPrompt(items, occasions, userReqs);

    const aiRes = await generateAIOutfitAction(prompt);
    console.log(aiRes);
    setIsGenerating(false);

    if (!aiRes.success) return;
    toast.success("Your outfits are ready!");
    setAIResults(aiRes.data);

    const outfits = toGeneratedOutfits(aiRes.data);

    setGeneratedOutfits(outfits);
    setShowResults(true);
  };

  const onSelectOutfit = (name: string) => {
    const outfit = generatedOutfits.find((o) => o.name === name);
    if (!outfit || !filteredFromDB) return;

    const itemsForView = getItemsByIds(filteredFromDB, outfit.items);

    setViewingOutfit({
      ...outfit,
      items: itemsForView,
    });
  };

  const closeModal = () => setViewingOutfit(null);

  const onSave = async (name: string) => {
    if (!generatedOutfits || !aiResults || !user) return;

    const outfit = aiResults.find((i) => i.name === name);

    if (!outfit) {
      return;
    }

    const outfitForCreate = transfromAIResponse(outfit, user.id);
    const createdOutfit = await createOutfitAction(outfitForCreate);
    if (!createdOutfit.success) {
      toast.error("Failed to save the outfit, please try again!");
      return;
    }

    toast.success(`${createdOutfit.data.name} Outfit created successfully!`);
    setViewingOutfit(null);
  };

  const scrollToResults = () => {
    const resultsSection = document.querySelector("[data-results-section]");
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const setFormField = useCallback(
    <K extends keyof AIGeneratorFormData>(key: K, value: AIGeneratorFormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
      if (key === "occasion" && value !== ("Other" as AIGeneratorFormData[K])) {
        setCustomOccasion("");
      }
    },
    [],
  );

  return {
    formData,
    filteredFromDB,
    customOccasion,
    canGenerate,
    isGenerating,
    showResults,
    generatedOutfits,
    open,
    viewingOutfit,
    isDark,
    scrollToResults,
    onSave,
    setFormData,
    setFormField,
    setCustomOccasion,
    handleGenerate,
    onSelectOutfit,
    setViewingOutfit,
    closeModal,
  };
}
