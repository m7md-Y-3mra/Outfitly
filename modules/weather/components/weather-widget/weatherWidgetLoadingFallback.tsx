"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const WeatherWidgetLoadingFallback = () => {
  return (
    <Card className="p-8 border-2 bg-[var(--card)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left */}
        <div>
          {/* Location */}
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <Skeleton className="h-6 w-40" />
          </div>

          {/* Temperature */}
          <div className="flex items-center gap-6 mb-4">
            <Skeleton className="h-20 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex justify-center">
          <Skeleton className="w-64 h-64 rounded-full" />
        </div>
      </div>
    </Card>
  );
};

export default WeatherWidgetLoadingFallback;
