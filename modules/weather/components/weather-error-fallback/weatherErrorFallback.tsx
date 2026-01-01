"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCw } from "lucide-react";

interface Props {
  error: Error;
  onRetry: () => void;
}

const WeatherErrorFallback = ({ error, onRetry }: Props) => {
  return (
    <div className="flex justify-center mt-12">
      <Card className="w-full max-w-lg border-2 border-red-500/50">
        <CardHeader className="text-center">
          <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-2" />
          <CardTitle className="text-red-600">Unable to load weather</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            We couldn’t fetch your local weather data.
          </p>

          <pre className="text-xs text-red-500 bg-red-50 p-2 rounded">{error.message}</pre>

          <Button onClick={onRetry} className="bg-red-600 hover:bg-red-700 text-white">
            <RotateCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherErrorFallback;
