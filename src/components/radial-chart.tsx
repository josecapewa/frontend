"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function RadialChart({ total }: { total?: number }) {
  const chartData = [
    {
      totalStudents: total ?? 0,
      fill: "white",
    },
  ];

  const chartConfig = {
    totalStudents: {
      label: "Total de alunos",
    },
  } satisfies ChartConfig;
  return (
    <ChartContainer config={chartConfig} className="h-[60px] aspect-square flex justify-start">
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={250}
        innerRadius={33}
        outerRadius={20}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:bg-ipilGray"
          polarRadius={[23, 74]}
        />
        <RadialBar dataKey="totalStudents" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                      className="fill-white text-sm font-bold"
                    >
                      {total ?? 0}
                    </tspan>
                  </text>
                );
              }
            }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
