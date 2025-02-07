import { Card } from "@/components/ui/card";
import NumberTicker from "@/components/ui/number-ticker";
import { Skeleton } from "@/components/ui/skeleton";

type StatisticCardProps = {
  value?: number;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  type?: "count" | "percentage" | "money";
  usePercentual?: boolean;
  afterValue?: string;
};
export default function StatisticCard({
  value,
  title,
  subtitle,
  icon,
  usePercentual,
  afterValue,
}: StatisticCardProps) {
  if (!value && !title) return <StatisticCardSkeleton />;

  return (
    <Card className="w-full relative shadow-md justify-between flex gap-6 p-4 bg-gradient-to-r from-gray-500 to-[#27AE60] rounded-lg text-white transition-all">
      <section className="flex flex-col w-max gap-2 justify-between">
        <h1 className="text-xl 2xl:text-3xl font-bold statistic:text-nowrap">
          {title}
        </h1>
        <p>{subtitle}</p>
        <div className="2xl:text-2xl">
          <NumberTicker className="text-white font-semibold" value={value} />
          {!afterValue && usePercentual ? (
            <span className="text-white">%</span>
          ) : (
            <span className="text-white">{afterValue}</span>
          )}
        </div>
      </section>
      <div className="p-2 border max-statistic:absolute flex my-auto h-max max-statistic:opacity-50 max-statistic:-translate-x-1/2 max-statistic:-translate-y-1/2 max-statistic:left-1/2 max-statistic: top-1/2 rounded-full">
        {icon}
      </div>
    </Card>
  );
}

export function StatisticCardSkeleton() {
  return (
    <Card className="w-max shadow-md items-center justify-between flex gap-6 p-4 bg-gradient-to-br from-ipilGray to-ipilOrange rounded-lg text-white">
      <section className="flex flex-col gap-2 justify-between">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-24" />
      </section>
      <Skeleton className="p-6 h-12 w-12 rounded-full" />
    </Card>
  );
}
