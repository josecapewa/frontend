import CustomViewCards from "@/components/custom/view-cards";
import { useSessionStore } from "@/modules/services/stores/session";

export default function CategoriesCardView({
  categories,
  onEdit,
  onDelete,
}: {
  categories?: Category[];
  onEdit?: (category: Category) => void;
  onDelete?: (id: string) => void;
}) {
  const user = useSessionStore((state) => state.user);

  return (
    <CustomViewCards
      data={categories}
      getPrimaryProperty={(category) => category.nome}
      getId={(category) => category.id}
      emptyMessage="Nenhuma categoria cadastrada"
      displayProperties={[{ getValue: "descricao", label: "Descrição" }]}
      onEdit={onEdit}
      onDelete={onDelete}
      user={user?.tipo === "master" ? user : undefined}
    />
  );
}
