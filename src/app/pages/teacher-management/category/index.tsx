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
import { teachersCategoriesService } from "@/modules/services/api/teacher_category";
import TeachersCategoriesTable from "@/components/teacher/categories/data/table";
import { handleOnSearch } from "@/modules/helpers/search-params";
import TeacherCategoryAddForm from "@/components/teacher/categories/form/add";
import TeacherCategoryEditForm from "@/components/teacher/categories/form/edit";

export default function TeachersCategoryPage() {
  const { hasPermission } = usePermissions();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const limit = Number(searchParams.get("limit") || 10);
  const page = Number(searchParams.get("page") || 1);
  const filter = searchParams.get("filtro") || undefined;
  const {
    data: teachersCategoriesData,
    error,
    refetch,
  } = useQuery({
    queryKey: ["teachersCategories", limit, page, filter],
    queryFn: () => teachersCategoriesService.getAll({ limit, page, filter }),
  });

  if (error) {
    toastErrorConfig("Erro ao carregar as categorias dos professores", error);
  }
  const [filterText, setFilterText] = useState(filter || "");

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [teacherCategoryIdToDelete, setteacherCategoryIdToDelete] =
    useState<string>();
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [teacherCategoryToEdit, setteacherCategoryToEdit] =
    useState<Category>();

  const handleOnAddDialogSubmit = async (data: CategoryToCreate) => {
    await teachersCategoriesService.create(data);
    await refetch();
    setIsAddDialogOpen(false);
  };
  const onTableEdit = (data: Category) => {
    setteacherCategoryToEdit(data);
    setIsEditDialogOpen(true);
  };
  const onTableDelete = (id: string) => {
    setteacherCategoryIdToDelete(id);
    setIsAlertDialogOpen(true);
  };

  const refetchList = async () => {
    toastPromiseConfig({
      fn: refetch(),
      loading: "A actualizar lista categorias...",
      success: "Categorias carregados com sucesso.",
    });
  };

  const handleOnEditDialogSubmit = async (data: CategoryToUpdate) => {
    await teachersCategoriesService.update(teacherCategoryToEdit!.id, data);
    refetchList();
    setIsEditDialogOpen(false);
  };

  const handleDelete = async () => {
    await teachersCategoriesService.delete(teacherCategoryIdToDelete!);
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
      {/* <div className="w-full appear flex gap-2 pb-2">
        <teacherCategoryRoomStatusChart roomsStatus={teacherCategorysData?.data} />
      </div> */}
      {canCreate && (
        <div className="w-full appear border-b flex justify-end gap-2 py-4">
          <AddButton onClick={() => setIsAddDialogOpen(true)}>
            Adicionar categoria
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
          totalPages={teachersCategoriesData?.info.totalPages}
        />
      </div>

      <TeachersCategoriesTable
        teachersCategories={teachersCategoriesData?.data}
        onDelete={canDelete ? onTableDelete : undefined}
        onEdit={canEdit ? onTableEdit : undefined}
      />

      <div className="my-4 flex justify-end w-full">
        <CustomPagination
          currentPage={page}
          totalPages={teachersCategoriesData?.info.totalPages}
        />
      </div>
      <FormDialog
        subject="Categoria"
        description="Adicione uma nova categoria"
        form={TeacherCategoryAddForm}
        isOpen={isAddDialogOpen}
        onDialogCloseClick={() => setIsAddDialogOpen(false)}
        onSubmit={handleOnAddDialogSubmit}
      />
      <FormDialog
        form={TeacherCategoryEditForm}
        data={teacherCategoryToEdit}
        subject="categoria"
        description="Editar categoria"
        isOpen={isEditDialogOpen}
        onDialogCloseClick={() => setIsEditDialogOpen(false)}
        onSubmit={handleOnEditDialogSubmit}
      />
      <AlertDeleteDialog
        subject="categoria"
        message=" Ao eliminar esta categoria, todos os dados associados a ele serão
        eliminados, incluindo salas, turmas, etc..X"
        isOpen={isAlertDialogOpen}
        onCancelClick={() => setIsAlertDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </section>
  );
}
