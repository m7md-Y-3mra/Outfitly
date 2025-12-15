"use client";

import * as React from "react";
import { Pie, PieChart, Label } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { category: "tops", visitors: 35, fill: "#4a0410" }, // Deep dark burgundy
  { category: "bottoms", visitors: 25, fill: "#671425" }, // Burgundy
  { category: "dresses", visitors: 20, fill: "#9e2a4b" }, // Muted rose
  { category: "shoes", visitors: 15, fill: "#d93c66" }, // Brighter pink
  { category: "accessories", visitors: 5, fill: "#f59e0b" }, // Mustard
];

const chartConfig = {
  tops: {
    label: "Tops",
    color: "#4a0410",
  },
  bottoms: {
    label: "Bottoms",
    color: "#671425",
  },
  dresses: {
    label: "Dresses",
    color: "#9e2a4b",
  },
  shoes: {
    label: "Shoes",
    color: "#d93c66",
  },
  accessories: {
    label: "Accessories",
    color: "#f59e0b",
  },
} satisfies ChartConfig;

export function ItemCategoriesChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col h-full shadow-sm border-border/40 rounded-2xl overflow-hidden">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-xl font-semibold text-foreground">Item Categories</CardTitle>
        <CardDescription className="text-sm font-light text-muted-foreground">
          Distribution by type
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="category"
              innerRadius={70}
              outerRadius={100}
              strokeWidth={5}
              stroke="var(--background)"
              paddingAngle={2}
              cornerRadius={4}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Items
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <div className="flex flex-col gap-4 p-6 pt-2">
        <div className="flex flex-col gap-3 w-full">
          {chartData.map((item) => (
            <div key={item.category} className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
                <span className="text-sm font-medium capitalize text-foreground/80">
                  {item.category}
                </span>
              </div>
              <span className="text-sm font-bold text-foreground">{item.visitors}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
