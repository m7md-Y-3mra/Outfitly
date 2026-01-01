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

const colors = ["#4a0410", "#671425", "#9e2a4b", "#d93c66", "#f59e0b", "#10b981", "#3b82f6"];

interface ItemCategoriesChartProps {
  data: { category: string; count: number }[];
}

export function ItemCategoriesChart({ data }: ItemCategoriesChartProps) {
  const chartData = React.useMemo(() => {
    const total = data.reduce((acc, curr) => acc + curr.count, 0);
    return data.map((item, index) => ({
      category: item.category.toLowerCase(),
      visitors: total > 0 ? Math.round((item.count / total) * 100) : 0,
      fill: colors[index % colors.length],
    }));
  }, [data]);

  const chartConfig = React.useMemo(() => {
    return data.reduce(
      (acc, item, index) => {
        acc[item.category.toLowerCase()] = {
          label: item.category,
          color: colors[index % colors.length],
        };
        return acc;
      },
      {} as Record<string, { label: string; color: string }>,
    ) as ChartConfig;
  }, [data]);

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);

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
