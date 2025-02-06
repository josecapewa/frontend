import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

export function PhotoStatusChart({
  photoData,
  title,
}: {
  photoData?: { withPhoto: number; withoutPhoto: number };
  title?: string;
}) {
  const chartConfig = {
    withPhoto: {
      label: "Com Foto",
      color: "#D96F32",
    },
    withoutPhoto: {
      label: "Sem Foto",
      color: "#000000",
    },
  } satisfies ChartConfig;
  if (!photoData) return <PhotoStatusChartSkeleton />;
  const { withPhoto, withoutPhoto } = photoData;
  const totalStudents = withPhoto + withoutPhoto;
  const chartData = [{ withPhoto, withoutPhoto }];

  const withPhotoPercent = Math.round((withPhoto / totalStudents) * 100);
  const withoutPhotoPercent = Math.round((withoutPhoto / totalStudents) * 100);

  return (
    <Card className="flex md:min-w-[397px] flex-col relative">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 mt-4 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto w-full aspect-square max-w-[180px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
            title={title}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalStudents.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Alunos
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              animationEasing="ease-in-out"
              dataKey="withPhoto"
              stackId="a"
              cornerRadius={5}
              fill="#D96F32"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="withoutPhoto"
              fill="#000000"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <div className="flex max-md:w-full max-md:flex-row px-2 max-md:-mt-16 max-md:py-4 flex-col max-xl:text-sm max-sm:text-xs justify-center gap-1 max-md:gap-3 md:absolute top-6 left-3">
        <div className="flex items-center gap-2 flex-wrap max-sm:justify-center">
          <span className="size-2 flex rounded-[1px] bg-ipilOrange" />
          Com foto :
          <span className="font-bold">
            {withPhoto} - {withPhotoPercent}%
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap max-sm:justify-center">
          <span className="size-2 flex rounded-[1px] bg-[#000000]" />
          Sem foto :
          <span className="font-bold">
            {withoutPhoto} - {withoutPhotoPercent}%
          </span>
        </div>
      </div>
    </Card>
  );
}

export function PhotoStatusChartSkeleton() {
  return (
    <Card className="flex md:min-w-[397px] flex-col relative">
      <CardHeader className="items-center pb-0">
        <Skeleton className="w-1/2 h-6" />
      </CardHeader>
      <CardContent className="flex flex-1 mt-4 pb-0 mb-[90px]">
        <div className="mx-auto animate-pulse w-full bg-[#d96f32b4] rounded-t-full rounded-b-md max-w-[180px] h-[90px] flex items-center justify-center rounded-full" />
      </CardContent>

      <div className="flex max-md:w-full max-md:flex-row max-md:-mt-16 max-md:py-4 flex-col max-xl:text-sm max-sm:text-xs justify-center gap-5 max-md:gap-3 md:absolute top-8 left-8">
        <Skeleton className="flex items-center gap-2 w-12 h-2" />
        <Skeleton className="flex items-center gap-2 w-12 h-2" />
      </div>
    </Card>
  );
}
