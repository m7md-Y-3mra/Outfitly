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

const chartConfig = {
  items: {
    label: "Items Added",
    color: "#671425",
  },
} satisfies ChartConfig;

interface ItemsAddedThisWeekChartProps {
  data: { day: string; items: number }[];
}

export function ItemsAddedThisWeekChart({ data }: ItemsAddedThisWeekChartProps) {
  const chartData = data;
  const max = Math.max(...chartData.map((d) => d.items), 1);

  return (
    <Card className="flex flex-col h-full shadow-sm border-border/40 rounded-2xl overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Wardrobe Activity</CardTitle>
        <CardDescription>Items added this week</CardDescription>
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
              stroke="var(--muted-foreground)"
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickCount={5}
              domain={[0, Math.ceil(max * 1.25)]}
              stroke="var(--muted-foreground)"
            />

            <ChartTooltip
              cursor={{ fill: "var(--muted)", opacity: 0.2 }}
              content={<ChartTooltipContent indicator="dot" />}
            />

            <ChartLegend content={<ChartLegendContent />} />

            <Bar dataKey="items" fill="var(--color-items)" radius={[4, 4, 0, 0]} barSize={24} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
