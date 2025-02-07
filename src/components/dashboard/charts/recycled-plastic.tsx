"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "Setembro", recycled: 305 },
  { month: "Outubro", recycled: 186 },
  { month: "Novembro", recycled: 214 },
  { month: "Dezembro", recycled: 237 },
  { month: "Janeiro", recycled: 73 },
  { month: "Fevereiro", recycled: 209 },
];

const chartConfig = {
  recycled: {
    label: "Plástico Reciclado",
    color: "#229e54",
  },
} satisfies ChartConfig;

export function RecycledPlasticChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Plástico reciclado</CardTitle>
        <CardDescription>Semptro 2024 - Fevereio 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="max-h-80 w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent labelFormatter={(value)=> `${value} kg`} hideLabel />}
            />
            <Bar dataKey="recycled" fill="var(--color-recycled)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Setembro Tem o maior índice<TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Total de plástico reciclado nos últimos 6 meses
        </div>
      </CardFooter>
    </Card>
  );
}
