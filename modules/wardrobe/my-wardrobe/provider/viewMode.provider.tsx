"use client";

import { createContext, useContext, useState } from "react";

type viewModeContextType = {
  viewMode: "grid" | "list";
  toggleMode: () => void;
};

const ViewModeContext = createContext<viewModeContextType | null>(null);

export function ViewModeProvider({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const toggleMode = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };
  const contextValue = {
    viewMode,
    toggleMode,
  };

  return <ViewModeContext.Provider value={contextValue}> {children} </ViewModeContext.Provider>;
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (context === null) {
    throw new Error("useViewMode must be used within a ViewModeProvider");
  }
  return context;
}
