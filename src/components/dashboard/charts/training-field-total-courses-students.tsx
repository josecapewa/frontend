import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Skeleton } from "@/components/ui/skeleton";
import NumberTicker from "@/components/ui/number-ticker";

type TotalCoursesStudentsProps = {
  coursesTotalStudents?: CourseTotalStudents[];
};
export function TrainingFieldTotalCoursesStudentsChart({
  coursesTotalStudents,
}: TotalCoursesStudentsProps) {
  const chartConfig = {
    boys: {
      label: "Masculino",
      color: "orangered",
    },
    girls: {
      label: "Feminino",
      color: "black",
    },
  } satisfies ChartConfig;
  if (!coursesTotalStudents)
    return <TrainingFieldTotalStudantsCoursesSkeleton />;

  const totalMale = coursesTotalStudents.reduce(
    (acc, course) => acc + course.total_masculinos,
    0
  );

  const totalFemale = coursesTotalStudents.reduce(
    (acc, course) => acc + course.total_femininos,
    0
  );

  const chartData = coursesTotalStudents.map((course) => ({
    codigo_curso: course.codigo_curso,
    boys: course.total_masculinos,
    girls: course.total_femininos,
  }));

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Distribuição de alunos por gênero e curso</CardTitle>
          <div className="flex flex-col items-center gap-1 flex-wrap">
            <p className="flex gap-1 items-center">
              <div className="size-2 bg-[orangered] rounded-sm" /> Maculinos:{" "}
              <span className="font-semibold">{totalMale}</span>
            </p>
            <p className="flex gap-1 items-center">
              <div className="size-2 bg-[black] rounded-sm" /> Femininos:{" "}
              <span className="font-semibold">{totalFemale}</span>
            </p>
          </div>

          <div>
            Total:{" "}
            <NumberTicker
              className="font-semibold"
              value={totalFemale + totalMale}
            />
          </div>

          <CardDescription>
            Obs.:Este gráfico filtra o total de alunos (Masculinos e Femininos)
            de cada curso.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillGirls" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-girls)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-girls)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillBoys" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-boys)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-boys)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="codigo_curso"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              interval="preserveStartEnd"
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => `Total de Alunos da  ${label}`}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="boys"
              type="natural"
              fill="url(#fillBoys)"
              stroke="var(--color-boys)"
              stackId="a"
            />
            <Area
              dataKey="girls"
              type="natural"
              fill="url(#fillGirls)"
              stroke="var(--color-girls)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function TrainingFieldTotalStudantsCoursesSkeleton() {
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
