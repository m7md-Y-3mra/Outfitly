"use client";

import useInitializer from "@/hooks/useInitializer";
import { Suspense } from "react";

export function AppClientWrapper({ children }: { children: React.ReactNode }) {
  useInitializer();
  return <Suspense fallback={<>Loading....</>}>{children}</Suspense>;
}
