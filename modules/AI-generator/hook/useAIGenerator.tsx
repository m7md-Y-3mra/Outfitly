"use client";

import { useCallback, useMemo, useState } from "react";

import type { AIOutfitResponse, IItemsForAI } from "../types/generator.types";
import type {
  AIGeneratorFormData,
  IGeneratedOutfit,
  IOutfitForModal,
} from "../components/aiGenerator";

import { createPrompt, getItemsByIds, toGeneratedOutfits, toUserRequirements, transfromAIResponse } from "../ai.utils";

import {
  createOutfitAction,
  generateAIOutfitAction,
  getItemsForGeneratorAction,
  getOccasionsForAIAction,
} from "../generator.actions";
import { ALL_OCCASIONS_DUMMY, ITEMS_FOR_AI_DUMMY } from "@/app/(main)/AI-generator/page";
import { useAuth } from "@/providers/auth/auth.provider";
import { toast } from "sonner";

export function useAIGenerator() {
  const [formData, setFormData] = useState<AIGeneratorFormData>({
    occasion: "",
    weather: "",
    style: "",
    requirements: "",
  });
  const { user } = useAuth();
  console.log(user);
  const [customOccasion, setCustomOccasion] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [generatedOutfits, setGeneratedOutfits] = useState<IGeneratedOutfit[]>([]);
  const [viewingOutfit, setViewingOutfit] = useState<IOutfitForModal | null>(null);
  const [filteredFromDB, setFilteredFromDB] = useState<IItemsForAI[] | null>(null); 
  const [aiResults, setAIResults] = useState<AIOutfitResponse[]>([])
  const canGenerate = useMemo(() => {
    return Boolean(
      formData.occasion &&
      formData.weather &&
      formData.style &&
      (formData.occasion !== "Other" || customOccasion.trim()),
    );
  }, [formData.occasion, formData.weather, formData.style, customOccasion]);

  const open = Boolean(viewingOutfit);

  const handleGenerate = useCallback(async () => {
    if (!canGenerate || isGenerating) return;

    setIsGenerating(true);
    setShowResults(false);

    const [itemsRes, occasionsRes] = await Promise.all([
      getItemsForGeneratorAction({ style: formData.style, weather: formData.weather }, "1"),
      getOccasionsForAIAction(),
    ]);

    if (!itemsRes.success || !occasionsRes.success) {
      setIsGenerating(false);
      return;
    }

    const items = itemsRes.data;
    const occasions = occasionsRes.data;
    console.log(occasions);
    setFilteredFromDB(items);

    const userReqs = toUserRequirements(formData);
    const prompt = createPrompt(ITEMS_FOR_AI_DUMMY, ALL_OCCASIONS_DUMMY, userReqs);

    const aiRes = await generateAIOutfitAction(prompt);
    console.log(aiRes);
    setIsGenerating(false);
    
    if (!aiRes.success) return;

    setAIResults(aiRes.data);

    const outfits = toGeneratedOutfits(aiRes.data);

    setGeneratedOutfits(outfits);
    setShowResults(true);
  }, [canGenerate, isGenerating, formData]);

  const onSelectOutfit = (name: string) => {
      const outfit = generatedOutfits.find((o) => o.name === name);
      if (!outfit || !filteredFromDB) return;

      const itemsForView = getItemsByIds(ITEMS_FOR_AI_DUMMY, outfit.items);

      setViewingOutfit({
        ...outfit,
        items: itemsForView,
      });
  }


  const closeModal = () => setViewingOutfit(null);

  const onSave = async(name: string) => {

    if(!generatedOutfits || !aiResults || !user) return;

    const outfit = aiResults.find((i) => (i.name === name));

    if(!outfit) {
        return;
    }

    const outfitForCreate = transfromAIResponse(outfit, user.id);
    const createdOutfit = await createOutfitAction(outfitForCreate);
    if(!createdOutfit.success) {
      toast.error("Failed to save the outfit, please try again!");
      return;
    }

    toast.success(`${createdOutfit.data.name} Outfit created successfully!`);
  }


 
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
