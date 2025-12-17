"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RotateCw } from "lucide-react";
import { FallbackProps } from "react-error-boundary";

const WardrobeListErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="mt-8 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg border-2 border-red-500/50 shadow-2xl shadow-red-500/20 dark:bg-[#2A2A30] dark:border-red-700">
        <CardHeader className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <CardTitle className="text-2xl text-red-600 dark:text-red-400">
            Something Went Wrong
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-center text-gray-700 dark:text-gray-300">
            We couldn&apos;t load your wardrobe items. This might be a temporary issue.
          </p>

          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-900 overflow-auto max-h-32">
            <h4 className="text-sm font-semibold text-red-700 dark:text-red-300 mb-1">
              Error Details:
            </h4>
            <pre className="text-xs text-red-600 dark:text-red-400 whitespace-pre-wrap">
              {error.message}
            </pre>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6">
          {/* Action 1: Reset Boundary (Try Again) */}
          <Button
            onClick={resetErrorBoundary}
            className="flex-1 w-full sm:w-auto bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white"
          >
            <RotateCw className="w-4 h-4 mr-2" />
            Try Reloading Wardrobe
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WardrobeListErrorFallback;
