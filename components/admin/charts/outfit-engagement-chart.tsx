"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartData = [
  { day: "Mon", likes: 450, shares: 320 },
  { day: "Tue", likes: 380, shares: 250 },
  { day: "Wed", likes: 520, shares: 180 },
  { day: "Thu", likes: 610, shares: 420 },
  { day: "Fri", likes: 850, shares: 550 },
  { day: "Sat", likes: 950, shares: 680 },
  { day: "Sun", likes: 720, shares: 480 },
];

const chartConfig = {
  likes: {
    label: "Likes",
    color: "#671425", // Dark burgundy
  },
  shares: {
    label: "Shares",
    color: "#9e2a4b", // Lighter burgundy/rose
  },
} satisfies ChartConfig;

export function OutfitEngagementChart() {
  return (
    <Card className="flex flex-col h-full shadow-sm border-border/40 rounded-2xl overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Outfit Engagement</CardTitle>
        <CardDescription>Likes and shares this week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-full w-full min-h-[300px]">
          <BarChart accessibilityLayer data={chartData} barCategoryGap={20}>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="var(--border)"
              strokeOpacity={0.4}
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
              stroke="var(--muted-foreground)"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickCount={5}
              domain={[0, 1000]}
              stroke="var(--muted-foreground)"
            />
            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.2 }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="likes" fill="var(--color-likes)" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="shares" fill="var(--color-shares)" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
