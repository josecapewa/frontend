import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { toastErrorConfig } from "@/components/config/toast";
import { rupesService } from "@/modules/services/api/rupes";
import CustomTitle from "@/components/custom/title";
import StatisticCard from "@/components/statistic/cards/normal";
import { FaLayerGroup } from "react-icons/fa";
import { VscLayersActive } from "react-icons/vsc";
import { BiErrorAlt } from "react-icons/bi";
import { TbBadgeOff } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import { ChartRupesPagosNaoPagos } from "@/components/rupes/dashboard/chart";
const chartData = [{ month: "january", desktop: 1260, mobile: 570 }];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function RupesDahsboardPage() {
  const totalVisitors = chartData[0].desktop + chartData[0].mobile;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart - Stacked</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
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
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="desktop"
              stackId="a"
              cornerRadius={5}
              fill="skyblue"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="mobile"
              fill="red"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const chartDatamm = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
];

// const meuconfig_teste = {
//   views: {
//     label: "Page Views",
//   },
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig

export function Componentq() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop");

  const total = React.useMemo(
    () => ({
      desktop: chartDatamm.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartDatamm.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["desktop", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartDatamm}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
export function DashboardRupesPage() {
  const { data, error } = useQuery<EstatisticaRupe>({
    queryKey: ["estatistica"],
    queryFn: rupesService.getStatisticsRupes,
  });
  if (error)
    toastErrorConfig("Erro ao carregar as estatisticas dos rupes", error);
  return (
    <>
      <section className="mt-4">
        <CustomTitle>Estatística</CustomTitle>
        <div className="flex flex-col gap-4">
          <div className="flex w-full gap-4 [&>*]:flex-1 flex-wrap">
            <StatisticCard
              value={data?.total ? data.total : 0}
              title="Total de Rupes"
              icon={<FaLayerGroup className="size-8" />}
            />
            <StatisticCard
              value={data?.disponivel ? data.disponivel : 0}
              title="Rupes Disponíveis"
              icon={<VscLayersActive className="size-8" />}
            />
            <StatisticCard
              value={data?.Indisponiveis ? data.Indisponiveis : 0}
              title="Rupes Indisponíveis"
              icon={<BiErrorAlt className="size-8" />}
            />
            <StatisticCard
              value={data?.expirados ? data.expirados : 0}
              title="Rupes Expirados"
              icon={<TbBadgeOff className="size-8" />}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex w-full gap-4 [&>*]:flex-1 flex-wrap">
              <StatisticCard
                value={2}
                title="Total"
                icon={<BiErrorAlt className="size-8" />}
                type="money"
              />
              <StatisticCard
                value={2}
                title="Disponíveis"
                icon={<FaLayerGroup className="size-8" />}
                type="money"
              />
              <StatisticCard
                value={2}
                title="Indisponíveis"
                icon={<VscLayersActive className="size-8" />}
                type="money"
              />
              <StatisticCard
                value={1000.0}
                title="Expirados"
                icon={<TbBadgeOff className="size-8" />}
                type="money"
              />
            </div>
          </div>
        </div>
        <div className="flex md:flex-row justify-center flex-col gap-10 mt-10">
          <ChartRupesPagosNaoPagos />
          <RupesDahsboardPage />
        </div>
        <div className="flex md:flex-row justify-center flex-col gap-10 mt-10">
          <Componentq />
        </div>
      </section>
    </>
  );
}
