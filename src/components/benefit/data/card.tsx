import CustomViewCards from "@/components/custom/view-cards";
import { useSessionStore } from "@/modules/services/stores/session";

export default function BenefitCards({
  benefits,
  onDelete,
  onEdit,
  onClick,
}: {
  benefits?: Benefit[];
  onEdit?: (benefit: Benefit) => void;
  onDelete?: (id: string) => void;
  onClick?: (benefit: Benefit) => void;
}) {
  const user = useSessionStore((state) => state.user);

  return (
    <CustomViewCards
      data={benefits}
      onDelete={onDelete}
      onEdit={onEdit}
      getPrimaryProperty={(benefit) => benefit.nome}
      getId={(benefit) => benefit.id}
      displayProperties={[
        { getValue: "descricao", label: "Descrição" },
        { getValue: "pontos", label: "Pontos" },
      ]}
      emptyMessage="Sem benefícios cadastrados"
      user={user?.tipo === "master" ? user : undefined}
      onClick={onClick}
    />
  );
}
