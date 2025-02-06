import CustomTable from "@/components/custom/table";
import { Button } from "@/components/ui/button";
import { MdAdminPanelSettings } from "react-icons/md";

export default function UsersTable({
  users,
  onEdit,
  onDelete,
  onViewPermissions,
}: {
  users?: User[];
  onEdit?: (item: User) => void;
  onDelete?: (id: string) => void;
  onViewPermissions: (user: User) => void;
}) {
  const headers = ["Nome", "Nome de usuário", "Permissões"];
  return (
    <CustomTable
      data={users}
      headers={headers}
      columns={[
        {
          data: (user) => (
            <span className="flex items-center gap-2">
              {user.pessoa.nome}{" "}
              {user.is_master && (
                <MdAdminPanelSettings className="text-ipilOrangeLight" />
              )}
            </span>
          ),
          align: "left",
        },
        {
          data: (user) => (
            <span className="flex items-center gap-2">
              {user.nome_usuario}{" "}
              {user.is_master && (
                <MdAdminPanelSettings className="text-ipilOrangeLight" />
              )}
            </span>
          ),
        },
        {
          data: (user: User) => (
            <Button onClick={() => onViewPermissions(user)}>Permissões</Button>
          ),
        },
      ]}
      getId={(user) => user.id}
      emptyMessage="Sem usuários cadastrados"
      onDelete={onDelete}
      onEdit={onEdit}
    />
  );
}
