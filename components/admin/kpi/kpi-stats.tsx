"use client";

import { Clock, Share2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function DashboardKPICards() {
  return (
    <div className="flex flex-col gap-2 h-full justify-start">
      {/* Avg Session Card */}
      <Card className="flex flex-col p-4 shadow-sm border-border/40 rounded-2xl overflow-hidden h-fit justify-center">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0 dark:bg-purple-900/20">
            <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-muted-foreground">Avg. Session</span>
            <span className="text-2xl font-bold leading-none">8m 32s</span>
          </div>
        </div>
        <div className="w-full">
          <Progress
            value={68}
            className="h-2 w-full bg-purple-100 dark:bg-purple-900/20 [&>*]:bg-purple-600 dark:[&>*]:bg-purple-400"
          />
        </div>
      </Card>

      {/* Share Rate Card */}
      <Card className="flex flex-col p-4 shadow-sm border-border/40 rounded-2xl overflow-hidden h-fit justify-center">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center shrink-0 dark:bg-green-900/20">
            <Share2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-muted-foreground">Share Rate</span>
            <span className="text-2xl font-bold leading-none">42.3%</span>
          </div>
        </div>
        <div className="w-full">
          <Progress
            value={42.3}
            className="h-2 w-full bg-green-100 dark:bg-green-900/20 [&>*]:bg-green-600 dark:[&>*]:bg-green-400"
          />
        </div>
      </Card>
    </div>
  );
}
