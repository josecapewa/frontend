import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

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
import { Skeleton } from "@/components/ui/skeleton";

export function TrainingFieldTotalCoursesChart({
  trainingFieldTotalCourses,
}: {
  trainingFieldTotalCourses?: TrainingFieldTotalCourses[];
}) {
  if (!trainingFieldTotalCourses)
    return <TrainingFieldTotalCoursesChartSkeleton />;
  const chartData = [
    ...trainingFieldTotalCourses.map((trainingField) => ({
      area: trainingField.nome,
      total_cursos: trainingField.total_cursos,
    })),
  ];

  const greaterArea = chartData.reduce((acc, curr) => {
    return curr.total_cursos > acc.total_cursos ? curr : acc;
  }, { area: "", total_cursos: 0 });

  const chartConfig = {
    total_cursos: {
      label: "Cursos",
      color: "#D96F32",
    },
  } satisfies ChartConfig;

  return (
    <Card className="transition-all flex flex-col">
      <CardHeader className="items-center pb-4">
        <CardTitle>Cursos</CardTitle>
        <CardDescription>Total de cursos por área de formação</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="mx-auto max-h-[200px]">
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="area" />
            <PolarGrid />
            <Radar dataKey="total_cursos" fill="#D96F32" fillOpacity={0.6} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 flex-1 items-center justify-center text-sm text-center">
        <div className="flex items-center gap-2 font-medium leading-none">
          A área de {greaterArea.area} está no topo de cursos com{" "}
          {greaterArea.total_cursos} cursos
          <TrendingUp size={18} className="text-ipilOrange" />
        </div>
      </CardFooter>
    </Card>
  );
}
export function TrainingFieldTotalCoursesChartSkeleton() {
  return (
    <Card className="">
      <CardHeader className="items-center pb-4">
        <CardTitle>
          <Skeleton className="h-6 w-20" />
        </CardTitle>
        <Skeleton className="h-4 w-40 mt-2" />
      </CardHeader>
      <CardContent className="pb-0">
        <div className="mx-auto aspect-square max-h-[162px] flex items-center justify-center">
          <Skeleton className="h-full w-full rounded-full" />
        </div>
      </CardContent>
      <CardFooter className="flex-col mt-3 gap-2 text-sm">
        <Skeleton className="h-4 w-56" />
        <Skeleton className="h-4 w-32 mt-2" />
      </CardFooter>
    </Card>
  );
}
