"use client";
import { Card, CardContent } from "@/components/ui/card";
import { FallbackProps } from "react-error-boundary";

const StatsErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Card className="bg-red-50 dark:bg-red-900">
      <CardContent className="flex flex-col gap-2 text-center">
        <p className="text-red-600 dark:text-red-400 font-semibold">Something went wrong</p>
        <p className="text-red-700 dark:text-red-300">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </CardContent>
    </Card>
  );
};

export default StatsErrorFallback;
