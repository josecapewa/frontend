import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { pleasantColors } from "@/lib/utils";
import { useMemo, useState } from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

export function TrainingFieldTotalClassesChart({
  traningFieldStatus,
  lectiveYear,
}: {
  traningFieldStatus?: TrainingFieldStatus[];
  lectiveYear?: string;
}) {


  const id = "pie-interactive";

  const chartData = useMemo(
    () =>
      (traningFieldStatus &&
        traningFieldStatus.map((trainingField, index) => ({
          area: trainingField.nome,
          total: trainingField.total_alunos,
          fill: pleasantColors[index % pleasantColors.length],
        }))) ||
      [],
    [traningFieldStatus]
  );

  const chartConfig = {
      total_alunos: {
        label: "Total de professores",
      },
      ...chartData.reduce((acc, curr) => {
        const key = curr.area;
        acc[key] = {
          label: curr.area,
        };
        return acc;
      }, {} as ChartConfig),
    } satisfies ChartConfig;

      const [activeTraningField, setActiveTrainingField] = useState(
        traningFieldStatus?.[0].nome
      );

       const activeIndex = useMemo(
          () => chartData.findIndex((item) => item.area === activeTraningField),
          [activeTraningField, chartData]
        );
        const trainingFields = useMemo(
          () => chartData.map((item) => item.area),
          [chartData]
        );
        if (!traningFieldStatus) {
          return <TrainingFieldTotalClassesSkeleton />;
        }
  
  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-col mb-4 md:flex-row items-start gap-2 space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Total de Turmas</CardTitle>
          <CardDescription>{lectiveYear}</CardDescription>
        </div>
        <Select
          value={activeTraningField ?? trainingFields[0]}
          onValueChange={setActiveTrainingField}
        >
          <SelectTrigger
            className="ml-auto h-7 w-[150px] rounded-md pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Área de formação" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-md">
            {trainingFields.map((key, ind) => {
              const config = chartConfig[key as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: chartData[ind].fill,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="area"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex !== -1 ? activeIndex : 0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 6} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
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
                          y={(viewBox.cy || 0) - 24}
                          className="fill-muted-foreground font-bold text-sm"
                        >
                          {traningFieldStatus[activeIndex]?.abreviacao ||
                            traningFieldStatus[0]?.abreviacao}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {chartData[activeIndex]?.total.toLocaleString() ||
                            chartData
                              .find((data) => data.area === trainingFields[0])
                              ?.total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Alunos
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
    </Card>
  );
}

export function TrainingFieldTotalClassesSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="ml-auto h-7 w-[130px] rounded-md" />
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <div className="mx-auto aspect-square w-full max-w-[250px] flex items-center justify-center">
          <Skeleton className="h-40 w-40 rounded-full" />
        </div>
      </CardContent>
    </Card>
  );
}
