import { RecycledPlasticChart } from "@/components/dashboard/charts/recycled-plastic";
import StatisticCard from "@/components/statistic/cards/normal";
import { FaRecycle, FaUser } from "react-icons/fa";
import { GoGoal } from "react-icons/go";

export default function Dashboard() {
  return (
    <section>
      <div className="flex gap-2 flex-wrap [&>*]:flex-1 mb-2">
        <StatisticCard
          title="Total de usuários"
          value={100}
          icon={<FaUser className="md:size-8 size-6" />}
        />
        <StatisticCard
          title="Meta de reciclagem do mês"
          value={2}
          afterValue=" de 5"
          icon={<GoGoal className="md:size-8 size-6" />}
        />
        <StatisticCard
          title="Peso bruto do material reciclado"
          value={40000}
          afterValue=" kg"
          icon={<FaRecycle className="md:size-8 size-6" />}
        />
      </div>
      <RecycledPlasticChart />
    </section>
  );
}
