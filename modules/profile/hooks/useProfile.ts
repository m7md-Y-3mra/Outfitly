"use client"
import { useState } from "react";
import type { TabType } from "../profile.types";

export function useProfile() {
  const [activeTab, setActiveTab] = useState<TabType>("outfits");

  return {
    activeTab,
    setActiveTab,
  };
}