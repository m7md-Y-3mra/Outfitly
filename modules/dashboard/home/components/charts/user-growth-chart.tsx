"use client";

import { Calendar } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";

const chartConfig = {
  users: {
    label: "Active Users",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface UserGrowthChartProps {
  data: { month: string; users: number }[];
}

export function UserGrowthChart({ data }: UserGrowthChartProps) {
  const chartData = data;
  return (
    <Card className="flex flex-col h-full shadow-sm border-border/40 rounded-2xl overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold text-foreground">User Growth</CardTitle>
          <CardDescription className="text-muted-foreground font-light">
            Monthly active users trend
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 h-8 rounded-full text-xs font-medium text-muted-foreground border-border/60 bg-transparent hover:bg-secondary/50"
        >
          <Calendar className="h-3.5 w-3.5" />
          Last 6 months
        </Button>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ChartContainer config={chartConfig} className="h-full w-full min-h-[300px]">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 12,
              top: 12,
              bottom: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="var(--border)"
              strokeOpacity={0.4}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tickFormatter={(value: string) => value.slice(0, 3)}
              stroke="var(--muted-foreground)"
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tickCount={6}
              domain={[0, 6000]}
              stroke="var(--muted-foreground)"
              fontSize={12}
            />
            <ChartTooltip
              cursor={{ stroke: "var(--border)", strokeWidth: 1, strokeDasharray: "3 3" }}
              content={<ChartTooltipContent indicator="dot" className="w-[150px]" />}
            />
            <Line
              dataKey="users"
              type="natural"
              stroke="#671425"
              strokeWidth={3}
              dot={{
                fill: "#671425",
                r: 4,
                strokeWidth: 2,
                stroke: "var(--background)",
              }}
              activeDot={{
                r: 6,
                strokeWidth: 2,
                stroke: "var(--background)",
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
