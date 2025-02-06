import AlertDeleteDialog from "@/components/custom/alert-delete";
import { toastErrorConfig } from "@/components/config/toast";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import FormDialog from "@/components/custom/form-dialog";
import { CustomPagination } from "@/components/custom/pagination";
import { useNavigate, useSearchParams } from "react-router";
import PageQuantitySelector from "@/components/page-quantity-selector";
import SearchInput from "@/components/custom/search-input";
import { useDebounce } from "@/modules/hooks/use-debounce";
import { handleOnSearch } from "@/modules/helpers/search-params";
import { userService } from "@/modules/services/api/user";
import UsersTable from "@/components/user/data/table";
import UserAddForm, { CustomUserToCreate } from "@/components/user/form/add";
import UserViewDialog from "@/components/user/dialog/view";
import UserEditForm, { CustomUserToUpdate } from "@/components/user/form/edit";
import { usePermissions } from "@/modules/hooks/use-permissions";
import AddButton from "@/components/custom/add-button";

export default function UsersPage() {
  const { hasPermission } = usePermissions();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const limit = Number(searchParams.get("limit") || 10);
  const page = Number(searchParams.get("page") || 1);
  const filter = searchParams.get("filtro") || undefined;

  const {
    data: usersData,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users", limit, page, filter],
    queryFn: () => userService.getAll({ limit, page, filter }),
  });

  if (error) toastErrorConfig("Erro ao carregar os usuários", error);

  const [filterText, setFilterText] = useState(filter || "");

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string>();
  const [userToEdit, setUserToEdit] = useState<User>();
  const [userToView, setUserToView] = useState<User | null>(null);

  const handleOnAddDialogSubmit = async (data: CustomUserToCreate) => {
    const permissoes_telas = data.permissoes_telas?.flatMap((pt) =>
      pt.permissoes.map((p) => ({
        caminho_tela: pt.caminho_tela,
        permissao: p,
      }))
    );
    await userService.create({
      ...data,
      permissoes_telas,
    });
    await refetch();
    setIsAddDialogOpen(false);
  };
  const onTableEdit = (data: User) => {
    setUserToEdit(data);
    setIsEditDialogOpen(true);
  };
  const onTableDelete = (id: string) => {
    setUserToDelete(id);
    setIsAlertDialogOpen(true);
  };

  const handleOnEditDialogSubmit = async (data: CustomUserToUpdate) => {
    console.log(data);
    const permissoes_telas = data.permissoes_telas?.flatMap((pt) =>
      pt.permissoes.map((p) => ({
        caminho_tela: pt.caminho_tela,
        permissao: p,
      }))
    );
    await userService.update(userToEdit!.id, {
      ...data,
      permissoes_telas,
    });
    await refetch();
    setIsEditDialogOpen(false);
  };
  const handleDelete = async () => {
    await userService.delete(userToDelete!);
    await refetch();
    setIsAlertDialogOpen(false);
  };

  const onViewPermissions = (User: User) => {
    setUserToView(User);
  };

  const onSearch = useDebounce(
    (text: string) =>
      handleOnSearch({
        text,
        searchParamsHelpers: { searchParams, navigate },
      }),
    500
  );
  const canCreate = hasPermission("CRIAR");
  const canEdit = hasPermission("EDITAR");
  const canDelete = hasPermission("ELIMINAR");
  return (
    <section className="py-4">
      {canCreate && (
        <div className="w-full appear border-b flex justify-end gap-2 py-4">
          <AddButton onClick={() => setIsAddDialogOpen(true)}>
            Adicionar usuário
          </AddButton>
        </div>
      )}
      <h2 className="mt-4 py-2 border-b font-bold text-lg">Filtros</h2>
      <section className="mt-2 flex gap-2 items-end flex-wrap">
        <SearchInput
          value={filterText}
          onChange={(e) => {
            setFilterText(e.target.value);
            onSearch(e.target.value);
          }}
        />
      </section>
      <div className="flex gap-2 py-4 items-center justify-end">
        Por página
        <PageQuantitySelector
          value={limit}
          navigateFunction={navigate}
          searchParams={searchParams}
        />
      </div>
      <div className="my-2 flex justify-end w-full">
        <CustomPagination
          currentPage={page}
          totalPages={usersData?.info.totalPages}
        />
      </div>
      <UsersTable
        onViewPermissions={onViewPermissions}
        users={usersData?.data}
        onEdit={canEdit ? onTableEdit : undefined}
        onDelete={canDelete ? onTableDelete : undefined}
      />
      <div className="my-4 flex justify-end w-full">
        <CustomPagination
          currentPage={page}
          totalPages={usersData?.info.totalPages}
        />
      </div>
      <FormDialog
        subject="Usuário"
        description="Adicione um novo usuário ao sistema"
        form={UserAddForm}
        isOpen={isAddDialogOpen}
        onDialogCloseClick={() => setIsAddDialogOpen(false)}
        onSubmit={handleOnAddDialogSubmit}
      />
      <FormDialog
        form={UserEditForm}
        data={userToEdit}
        subject="Usuário"
        description="Editar Usuário"
        isOpen={isEditDialogOpen}
        onDialogCloseClick={() => setIsEditDialogOpen(false)}
        onSubmit={handleOnEditDialogSubmit}
      />
      <UserViewDialog
        user={userToView}
        onDialogCloseClick={() => setUserToView(null)}
      />
      <AlertDeleteDialog
        subject="usuário"
        message="Ao eliminar este usuário, todos os dados associados a ele serão
        eliminados..."
        isOpen={isAlertDialogOpen}
        onCancelClick={() => setIsAlertDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </section>
  );
}
