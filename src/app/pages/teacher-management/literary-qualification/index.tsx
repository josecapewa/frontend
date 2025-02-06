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
import { literaryQualificationService } from "@/modules/services/api/literaly-qualifications";
import LiteraryQualificationsTable from "@/components/teacher/literary-qualifications/data/table";
import LiteraryQualificationAddForm from "@/components/teacher/literary-qualifications/form/add";
import LiteraryQualificationEditForm from "@/components/teacher/literary-qualifications/form/edit";

export default function LiteraryQualificationPage() {
  const { hasPermission } = usePermissions();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const limit = Number(searchParams.get("limit") || 10);
  const page = Number(searchParams.get("page") || 1);
  const filter = searchParams.get("filtro") || undefined;
  const {
    data: literaryQualificarionsData,
    error,
    refetch,
  } = useQuery({
    queryKey: ["literaryQualificarions", limit, page, filter],
    queryFn: () => literaryQualificationService.getAll({ limit, page, filter }),
  });

  if (error) {
    toastErrorConfig(
      "Erro ao carregar os dados das habilitações literárias",
      error
    );
  }
  const [filterText, setFilterText] = useState(filter || "");

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [literaryQualificationIdToDelete, setLiteraryQualificationIdToDelete] =
    useState<string>();
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [literaryQualificationToEdit, setLiteraryQualificationToEdit] =
    useState<LiteraryQualification>();

  const handleOnAddDialogSubmit = async (
    data: LiteraryQualificationToCreate
  ) => {
    await literaryQualificationService.create(data);
    await refetch();
    setIsAddDialogOpen(false);
  };
  const onTableEdit = (data: LiteraryQualification) => {
    setLiteraryQualificationToEdit(data);
    setIsEditDialogOpen(true);
  };
  const onTableDelete = (id: string) => {
    setLiteraryQualificationIdToDelete(id);
    setIsAlertDialogOpen(true);
  };

  const refetchList = async () => {
    toastPromiseConfig({
      fn: refetch(),
      loading: "A actualizar lista Habilitação literárias...",
      success: "Habilitação literárias carregados com sucesso.",
    });
  };

  const handleOnEditDialogSubmit = async (
    data: LiteraryQualificationToUpdate
  ) => {
    await literaryQualificationService.update(
      literaryQualificationToEdit!.id,
      data
    );
    refetchList();
    setIsEditDialogOpen(false);
  };

  const handleDelete = async () => {
    await literaryQualificationService.delete(literaryQualificationIdToDelete!);
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
            Adicionar Habilitação literária
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
          totalPages={literaryQualificarionsData?.info.totalPages}
        />
      </div>

      <LiteraryQualificationsTable
        literaryQualifications={literaryQualificarionsData?.data}
        onDelete={canDelete ? onTableDelete : undefined}
        onEdit={canEdit ? onTableEdit : undefined}
      />

      <div className="my-4 flex justify-end w-full">
        <CustomPagination
          currentPage={page}
          totalPages={literaryQualificarionsData?.info.totalPages}
        />
      </div>
      <FormDialog
        subject="Habilitação literária"
        description="Adicione uma nova habilitação literária"
        form={LiteraryQualificationAddForm}
        isOpen={isAddDialogOpen}
        onDialogCloseClick={() => setIsAddDialogOpen(false)}
        onSubmit={handleOnAddDialogSubmit}
      />
      <FormDialog
        form={LiteraryQualificationEditForm}
        data={literaryQualificationToEdit}
        subject="Habilitação literária"
        description="Editar habilitação literária"
        isOpen={isEditDialogOpen}
        onDialogCloseClick={() => setIsEditDialogOpen(false)}
        onSubmit={handleOnEditDialogSubmit}
      />
      <AlertDeleteDialog
        subject="Habilitação literária"
        message="Ao eliminar esta habilitação literária,afirma saber das consequências"
        isOpen={isAlertDialogOpen}
        onCancelClick={() => setIsAlertDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </section>
  );
}
