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
import { userLevelService } from "@/modules/services/api/user-level";
import UsersLevelsTable from "@/components/user-level/data/table";
import UserLevelAddForm, {
  CustomUserLevelToCreate,
} from "@/components/user-level/form/add";
import UserLevelEditForm, {
  CustomUserLevelToUpdate,
} from "@/components/user-level/form/edit";
import UserLevelViewDialog from "@/components/user-level/dialog/view";
import { usePermissions } from "@/modules/hooks/use-permissions";
import AddButton from "@/components/custom/add-button";

export default function UsersLevelsPage() {
  const {hasPermission} = usePermissions();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const limit = Number(searchParams.get("limit") || 10);
  const page = Number(searchParams.get("page") || 1);
  const filter = searchParams.get("filtro") || undefined;

  const {
    data: userLevelsData,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user_levels", limit, page, filter],
    queryFn: () => userLevelService.getAll({ limit, page, filter }),
  });

  if (error) toastErrorConfig("Erro ao carregar os níveis de usuários", error);

  const [filterText, setFilterText] = useState(filter || "");

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [userLevelToDelete, setUserLevelToDelete] = useState<string>();
  const [userLevelToEdit, setUserLevelToEdit] = useState<UserLevel>();
  const [userLevelToView, setUserLevelToView] = useState<UserLevel | null>(
    null
  );

  const handleOnAddDialogSubmit = async (data: CustomUserLevelToCreate) => {
    const permissoes_telas = data.permissoes_telas.flatMap((pt) =>
      pt.permissoes.map((p) => ({
        caminho_tela: pt.caminho_tela,
        permissao: p,
      }))
    );

    await userLevelService.create({
      descricao: data.descricao ?? null,
      nome: data.nome,
      permissoes_telas,
    });
    await refetch();
    setIsAddDialogOpen(false);
  };
  const onTableEdit = (data: UserLevel) => {
    setUserLevelToEdit(data);
    setIsEditDialogOpen(true);
  };
  const onTableDelete = (id: string) => {
    setUserLevelToDelete(id);
    setIsAlertDialogOpen(true);
  };

  const handleOnEditDialogSubmit = async (data: CustomUserLevelToUpdate) => {
    const permissoes_telas = data.permissoes_telas?.flatMap((pt) =>
      pt.permissoes.map((p) => ({
        caminho_tela: pt.caminho_tela,
        permissao: p,
      }))
    );
    await userLevelService.update(userLevelToEdit!.id, {
      descricao: data.descricao,
      nome: data.nome,
      permissoes_telas,
    });
    await refetch();
    setIsEditDialogOpen(false);
  };

  const handleDelete = async () => {
    await userLevelService.delete(userLevelToDelete!);
    await refetch();
    setIsAlertDialogOpen(false);
  };

  const onViewPermissions = (userLevel: UserLevel) => {
    setUserLevelToView(userLevel);
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
      { canCreate && <div className="w-full appear border-b flex justify-end gap-2 py-4">
        <AddButton onClick={() => setIsAddDialogOpen(true)}>
          Adicionar nível de usuário
        </AddButton>
      </div>}
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
          totalPages={userLevelsData?.info.totalPages}
        />
      </div>
      <UsersLevelsTable
        onViewPermissions={onViewPermissions}
        usersLevels={userLevelsData?.data}
        onEdit={canEdit ? onTableEdit : undefined}
        onDelete={canDelete ? onTableDelete : undefined}
      />
      <div className="my-4 flex justify-end w-full">
        <CustomPagination
          currentPage={page}
          totalPages={userLevelsData?.info.totalPages}
        />
      </div>
      <FormDialog
        subject="Nível de Usuário"
        description="Adicione um novo nível de usuário"
        form={UserLevelAddForm}
        isOpen={isAddDialogOpen}
        onDialogCloseClick={() => setIsAddDialogOpen(false)}
        onSubmit={handleOnAddDialogSubmit}
      />
      <FormDialog
        form={UserLevelEditForm}
        data={userLevelToEdit}
        subject="Nível de Usuário"
        description="Editar Nível de Usuário"
        isOpen={isEditDialogOpen}
        onDialogCloseClick={() => setIsEditDialogOpen(false)}
        onSubmit={handleOnEditDialogSubmit}
      />
      <UserLevelViewDialog
        userLevel={userLevelToView}
        onDialogCloseClick={() => setUserLevelToView(null)}
      />
      <AlertDeleteDialog
        subject="Nível de Usuário"
        message="Ao eliminar este nível de usuário, todos os dados associados a ele serão
        eliminados..."
        isOpen={isAlertDialogOpen}
        onCancelClick={() => setIsAlertDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </section>
  );
}
