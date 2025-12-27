"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export function ProfileSectionError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-4 p-8 border-2 rounded-2xl">
      <AlertTriangle className="w-10 h-10 text-destructive" />
      <p className="text-muted-foreground">{message}</p>
      <Button onClick={onRetry}>Retry</Button>
    </div>
  );
}
