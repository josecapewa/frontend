"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function GradesTotalStudentsByGenderChart({
  gradesTotalStudents,
}: {
  gradesTotalStudents?: GradesTotalStudents[];
}) {
  const chartConfig = {
    gradesBoys: {
      label: "Masculino",
      color: "orangered",
    },
    gradesGirls: {
      label: "Feminino",
      color: "black",
    },
  } satisfies ChartConfig;

  const chartData = gradesTotalStudents?.map((grade) => ({
    designacao: grade.designacao,
    gradesBoys: grade.total_masculinos,
    gradesGirls: grade.total_femininos,
  }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de alunos por gênero e classe</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-96  w-full">
          <BarChart data={chartData}>
            <defs>
              <linearGradient id="fillGirlsGrades" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-gradesGirls)"
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-gradesGirls)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillBoysGrades" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-gradesBoys)"
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-gradesBoys)"
                  stopOpacity={0.2}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="designacao"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => `Alunos da ${label}`}
                />
              }
            />
            <Bar
              dataKey="gradesBoys"
              stackId="a"
              fill="url(#fillBoysGrades)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="gradesGirls"
              stackId="a"
              fill="url(#fillGirlsGrades)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                dataKey={(d) => d.gradesBoys + d.gradesGirls}
                position="top"
                offset={5}
                className="fill-foreground"
                fontWeight={550}
                fontSize={12}
              />
            </Bar>
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
