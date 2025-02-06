import AlertDeleteDialog from "@/components/custom/alert-delete";
import {
  toastErrorConfig,
  toastPromiseConfig,
} from "@/components/config/toast";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import FormDialog from "@/components/custom/form-dialog";
import { CustomPagination } from "@/components/custom/pagination";
import { useNavigate, useSearchParams } from "react-router";
import PageQuantitySelector from "@/components/page-quantity-selector";
import SearchInput from "@/components/custom/search-input";
import { useDebounce } from "@/modules/hooks/use-debounce";
import { usePermissions } from "@/modules/hooks/use-permissions";
import AddButton from "@/components/custom/add-button";
import { handleOnSearch } from "@/modules/helpers/search-params";
import { pedagogicalRolesService } from "@/modules/services/api/pedagogical-roles";
import PedagogicalRolesTable from "@/components/teacher/pedagogical-roles/data/table";
import PedagogicalRolesAddForm from "@/components/teacher/pedagogical-roles/form/add";
import PedagogicalRoleEditForm from "@/components/teacher/pedagogical-roles/form/edit";


export default function PedagogicalRolesPage() {
  const { hasPermission } = usePermissions();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const limit = Number(searchParams.get("limit") || 10);
  const page = Number(searchParams.get("page") || 1);
  const filter = searchParams.get("filtro") || undefined;
  const {
    data: pedagogicalRolesData,
    error,
    refetch,
  } = useQuery({
    queryKey: ["pedagogicalRoles", limit, page, filter],
    queryFn: () => pedagogicalRolesService.getAll({ limit, page, filter }),
  });

  if (error) {
    toastErrorConfig(
      "Erro ao carregar os dados dos cargosl pedagógicos",
      error
    );
  }
  const [filterText, setFilterText] = useState(filter || "");

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [PedagogicalRoleIdToDelete, setPedagogicalRoleIdToDelete] =
    useState<string>();
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [PedagogicalRoleToEdit, setPedagogicalRoleToEdit] =
    useState<PedagogicalRole>();

  const handleOnAddDialogSubmit = async (
    data: PedagogicalRoleToCreate
  ) => {
    await pedagogicalRolesService.create(data);
    await refetch();
    setIsAddDialogOpen(false);
  };
  const onTableEdit = (data: PedagogicalRole) => {
    setPedagogicalRoleToEdit(data);
    setIsEditDialogOpen(true);
  };
  const onTableDelete = (id: string) => {
    setPedagogicalRoleIdToDelete(id);
    setIsAlertDialogOpen(true);
  };

  const refetchList = async () => {
    toastPromiseConfig({
      fn: refetch(),
      loading: "A actualizar lista cargos pedagógicos...",
      success: "Cargos pedagógicos carregados com sucesso.",
    });
  };

  const handleOnEditDialogSubmit = async (
    data: PedagogicalRoleToUpdate
  ) => {
    await pedagogicalRolesService.update(
      PedagogicalRoleToEdit!.id,
      data
    );
    refetchList();
    setIsEditDialogOpen(false);
  };

  const handleDelete = async () => {
    await pedagogicalRolesService.delete(PedagogicalRoleIdToDelete!);
    await refetch();
    setIsAlertDialogOpen(false);
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
    <section>
      {canCreate && (
        <div className="w-full appear border-b flex justify-end gap-2 py-4">
          <AddButton onClick={() => setIsAddDialogOpen(true)}>
            Adicionar regime laboral
          </AddButton>
        </div>
      )}
      <h2 className="mt-4 py-2 border-b font-bold text-lg">Filtros</h2>
      <section className="mt-2 flex gap-2 items-end flex-wrap justify-between">
        <SearchInput
          value={filterText}
          onChange={(e) => {
            setFilterText(e.target.value);
            onSearch(e.target.value);
          }}
        />
      </section>

      <div className="flex gap-2 pt-4 items-center justify-end">
        <PageQuantitySelector
          value={limit}
          navigateFunction={navigate}
          searchParams={searchParams}
        />
        Por página
      </div>
      <div className="my-4 flex justify-end w-full">
        <CustomPagination
          currentPage={page}
          totalPages={pedagogicalRolesData?.info.totalPages}
        />
      </div>

      <PedagogicalRolesTable
        pedagogicalRoles={pedagogicalRolesData?.data}
        onDelete={canDelete ? onTableDelete : undefined}
        onEdit={canEdit ? onTableEdit : undefined}
      />

      <div className="my-4 flex justify-end w-full">
        <CustomPagination
          currentPage={page}
          totalPages={pedagogicalRolesData?.info.totalPages}
        />
      </div>
      <FormDialog
        subject="Cargo pedagógico"
        description="Adicione uma nova cargo pedagógico"
        form={PedagogicalRolesAddForm}
        isOpen={isAddDialogOpen}
        onDialogCloseClick={() => setIsAddDialogOpen(false)}
        onSubmit={handleOnAddDialogSubmit}
      />
      <FormDialog
        form={PedagogicalRoleEditForm}
        data={PedagogicalRoleToEdit}
        subject="Cargo pedagógico"
        description="Editar cargo pedagógico"
        isOpen={isEditDialogOpen}
        onDialogCloseClick={() => setIsEditDialogOpen(false)}
        onSubmit={handleOnEditDialogSubmit}
      />
      <AlertDeleteDialog
        subject="cargo pedagógico"
        message="Ao eliminar este cargo pedagógico, afirma saber das consequências"
        isOpen={isAlertDialogOpen}
        onCancelClick={() => setIsAlertDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </section>
  );
}
