import CustomTable from "@/components/custom/table";
import { Button } from "@/components/ui/button";

export default function UsersLevelsTable({
  usersLevels,
  onEdit,
  onDelete,
  onViewPermissions,
}: {
  usersLevels?: UserLevel[];
  onEdit?: (item: UserLevel) => void;
  onDelete?: (id: string) => void;
  onViewPermissions: (userLevel: UserLevel) => void;
}) {
  const headers = ["Nome", "Permissões", "Descrição"];
  return (
    <CustomTable
      data={usersLevels}
      headers={headers}
      columns={[
        { data: "nome" },
        {
          data: (userLevel: UserLevel) => (
            <Button onClick={() => onViewPermissions(userLevel)}>
              Permissões
            </Button>
          ),
        },
        { data: (userLevel) => userLevel.descricao ?? "Sem descrição" },
      ]}
      getId={(userLevel) => userLevel.id}
      emptyMessage="Sem níveis de usuário cadastrados"
      onDelete={onDelete}
      onEdit={onEdit}
    />
  );
}
