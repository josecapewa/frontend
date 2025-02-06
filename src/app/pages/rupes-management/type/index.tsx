import AlertDeleteDialog from "@/components/custom/alert-delete";
import {
  toastErrorConfig,
  toastPromiseConfig,
} from "@/components/config/toast";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import FormDialog from "@/components/custom/form-dialog";
import TipoRupeAddForm from "@/components/tipo-rupe/form/add";
import TipoRupeEditForm from "@/components/tipo-rupe/form/edit";
import { CustomPagination } from "@/components/custom/pagination";
import { useNavigate, useSearchParams } from "react-router";
import PageQuantitySelector from "@/components/page-quantity-selector";
import SearchInput from "@/components/custom/search-input";
import ViewStylesWrapper from "@/components/view-styles/wrapper";
import TipoRupesTable from "@/components/tipo-rupe/data/table";
import { handleOnSearch } from "@/modules/helpers/search-params";
import TipoRupeCards from "@/components/tipo-rupe/data/cards";
import { tipoRupeService } from "@/modules/services/api/tipo-rupe";
import { useDebounce } from "@/modules/hooks/use-debounce";
import AddButton from "@/components/custom/add-button";
import { usePermissions } from "@/modules/hooks/use-permissions";

export default function RupeTypesPage() {
  const { hasPermission } = usePermissions();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [tipoRupeIdToDelete, setTipoRupeIdToDelete] = useState<string>();
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [tipoRupeToEdit, setTipoRupeToEdit] = useState<TipoRupe>();

  const limit = Number(searchParams.get("limit") || 10);
  const page = Number(searchParams.get("page") || 1);
  const filter = searchParams.get("filtro") || undefined;

  const {
    data: tipoRupeData,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tipo-rupe", limit, page, filter],
    queryFn: () => tipoRupeService.getAll({ limit, page, filter }),
  });
  const [filterText, setFilterText] = useState(filter || "");

  const handleOnAddDialogSubmit = async (data: TipoRupeToCreate) => {
    await tipoRupeService.create(data);
    await refetch();
    setIsAddDialogOpen(false);
  };
  const onTableEdit = (data: TipoRupe) => {
    setTipoRupeToEdit(data);
    setIsEditDialogOpen(true);
  };
  const onTableDelete = (id: string) => {
    setTipoRupeIdToDelete(id);
    setIsAlertDialogOpen(true);
  };

  const refetchList = async () => {
    toastPromiseConfig({
      fn: refetch(),
      loading: "A actualizar lista TipoRupees...",
      success: "Tipos de rupes carregados com sucesso.",
    });
  };

  const handleOnEditDialogSubmit = async (data: TipoRupeToUpdate) => {
    await tipoRupeService.update(tipoRupeToEdit!.id, data);
    refetchList();
    setIsEditDialogOpen(false);
  };

  const handleDelete = async () => {
    await tipoRupeService.delete(tipoRupeIdToDelete!);
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

  if (error) {
    toastErrorConfig("Erro ao carregar os tipos de rupes", error);
  }
  const canCreate = hasPermission('CRIAR');
  const canEdit = hasPermission('EDITAR');
  const canDelete = hasPermission('ELIMINAR');
  return (
    <section>
      {canCreate && <div className="w-full appear border-y flex justify-end gap-2 py-4">
        <AddButton onClick={() => setIsAddDialogOpen(true)}>
          Adicionar Tipo de Rupe
        </AddButton>
      </div>}
      <h2 className="mt-4 py-2 border-b font-bold text-lg">Filtros</h2>
      <section className="mt-2 flex gap-2 items-end flex-wrap justify-between">
        <div className="flex gap-2 items-center py-2">
          <SearchInput
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
              onSearch(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-2 items-center py-2">
          Por página
          <PageQuantitySelector
            value={limit}
            navigateFunction={navigate}
            searchParams={searchParams}
          />
        </div>
      </section>

      <div className="my-2 flex justify-end w-full">
        <CustomPagination
          currentPage={page}
          totalPages={tipoRupeData?.info.totalPages}
        />
      </div>

      <ViewStylesWrapper
        card={
          <TipoRupeCards
            tipoRupes={tipoRupeData?.data}
            onEdit={onTableEdit}
            onDelete={onTableDelete}
          />
        }
        table={
          <TipoRupesTable
            tipoRupes={tipoRupeData?.data}
            onEdit={canEdit ? onTableEdit : undefined}
            onDelete={canDelete ? onTableDelete : undefined}
          />
        }
      />

      <div className="my-4 flex justify-end w-full">
        <CustomPagination
          currentPage={page}
          totalPages={tipoRupeData?.info.totalPages}
        />
      </div>
      <FormDialog
        subject="Tipo de rupe"
        description="Adicione um novo tipo de rupe"
        form={TipoRupeAddForm}
        isOpen={isAddDialogOpen}
        onDialogCloseClick={() => setIsAddDialogOpen(false)}
        onSubmit={handleOnAddDialogSubmit}
      />
      <FormDialog
        form={TipoRupeEditForm}
        data={tipoRupeToEdit}
        subject="Tipo de rupe"
        description="Editar tipo de rupe"
        isOpen={isEditDialogOpen}
        onDialogCloseClick={() => setIsEditDialogOpen(false)}
        onSubmit={handleOnEditDialogSubmit}
      />
      <AlertDeleteDialog
        subject="Tipo de Rupe"
        message=" Ao eliminar este tipo, todos os dados associados a ele serão eliminados"
        isOpen={isAlertDialogOpen}
        onCancelClick={() => setIsAlertDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </section>
  );
}
