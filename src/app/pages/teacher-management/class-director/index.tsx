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
import { classDirectorService } from "@/modules/services/api/class-director";
import ClassDirectorsTable from "@/components/teacher/class-director/data/table";
import ClassDirectorAddForm from "@/components/teacher/class-director/form/add";
import { classService } from "@/modules/services/api/class";

export default function ClassDirectorsPage() {
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
    queryKey: ["classDirectors", limit, page, filter],
    queryFn: () => classDirectorService.getAll({ limit, page, filter }),
  });

  const { data: classesData, error: classesError } = useQuery({
    queryKey: ["classes"],
    queryFn: () => classService.getAll(),
  });

  if (classesError) {
    toastErrorConfig("Erro ao carregar as turmas", classesError);
  }

  if (error) {
    toastErrorConfig("Erro ao carregar os directores de turma", error);
  }
  const [filterText, setFilterText] = useState(filter || "");

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [classDirectorIdToDelete, setclassDirectorIdToDelete] =
    useState<string>();
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [classDirectorToEdit, setclassDirectorToEdit] =
    useState<ClassDirector>();

  const handleOnAddDialogSubmit = async (data: ClassDirectorToCreate) => {
    await classDirectorService.create(data);
    await refetch();
    setIsAddDialogOpen(false);
  };
  const onTableEdit = (data: ClassDirector) => {
    setclassDirectorToEdit(data);
    setIsEditDialogOpen(true);
  };
  const onTableDelete = (id: string) => {
    setclassDirectorIdToDelete(id);
    setIsAlertDialogOpen(true);
  };

  const refetchList = async () => {
    toastPromiseConfig({
      fn: refetch(),
      loading: "A actualizar lista categorias...",
      success: "Categorias carregados com sucesso.",
    });
  };

  const handleOnEditDialogSubmit = async (data: ClassDirectorToUpdate) => {
    await classDirectorService.update(classDirectorToEdit!.id, data);
    refetchList();
    setIsEditDialogOpen(false);
  };

  const handleDelete = async () => {
    await classDirectorService.delete(classDirectorIdToDelete!);
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
        <classDirectorRoomStatusChart roomsStatus={classDirectorsData?.data} />
      </div> */}
      {canCreate && (
        <div className="w-full appear border-b flex justify-end gap-2 py-4">
          <AddButton onClick={() => setIsAddDialogOpen(true)}>
            Adicionar director de turma
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

      <ClassDirectorsTable
        classDirectors={teachersCategoriesData?.data}
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
        subject="Director de turma"
        description="Adicione um novo director de turma"
        form={ClassDirectorAddForm}
        otherData={{ classes: classesData?.data, }}
        isOpen={isAddDialogOpen}
        onDialogCloseClick={() => setIsAddDialogOpen(false)}
        onSubmit={handleOnAddDialogSubmit}
      />
      {/* <FormDialog
        form={classDirectorEditForm}
        data={classDirectorToEdit}
        subject="categoria"
        description="Editar categoria"
        isOpen={isEditDialogOpen}
        onDialogCloseClick={() => setIsEditDialogOpen(false)}
        onSubmit={handleOnEditDialogSubmit}
      /> */}
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
