import { useEffect, useState } from "react";
import AlertDeleteDialog from "@/components/custom/alert-delete";
import CustomSelector from "@/components/custom/combo-box";
import { CustomPagination } from "@/components/custom/pagination";
import CustomTable from "@/components/custom/table";
import PageQuantitySelector from "@/components/page-quantity-selector";
import SearchInput from "@/components/custom/search-input";
import { Label } from "@/components/ui/label";
import { useNavigate, useSearchParams } from "react-router";
import FormDialog from "@/components/custom/form-dialog";
import { rupesService } from "@/modules/services/api/rupes";
import { useQuery } from "@tanstack/react-query";
import { toastErrorConfig } from "@/components/config/toast";
import RupeEditForm from "@/components/rupes/form/edit";
import { tipoRupeService } from "@/modules/services/api/tipo-rupe";
import { handleParamChange } from "@/modules/helpers/search-params";
import RupeAddForm, { RupesOtherData } from "@/components/rupes/form/form-rupe";
import AddButton from "@/components/custom/add-button";
import { usePermissions } from "@/modules/hooks/use-permissions";

export default function ListRupesPage() {
  const { hasPermission } = usePermissions();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const state = searchParams.get("state") || undefined;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [rupesIdToDelete, setRupesIdToDelete] = useState<string>();
  const [itemsPerPage] = useState(5);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState<RupeExam>();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const currentPage = parseInt(searchParams.get("page") || "1");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(state);

  const {
    data,
    error,
    refetch: refetchRupes,
  } = useQuery({
    queryKey: ["data"],
    queryFn: () => rupesService.getAll(),
  });
  if (error) toastErrorConfig("Erro ao trazer os rupes", error);

  const { data: tipoRupeData, error: tipoRupeError } = useQuery({
    queryKey: ["tipo-rupe"],
    queryFn: () => tipoRupeService.getAll(),
  });
  if (tipoRupeError)
    toastErrorConfig("Erro ao carregar os tipos de rupes", tipoRupeError);

  const handleOnAddDialogSubmit = async (data: RupesToCreate) => {
    await rupesService.create(data);
    await refetchRupes();
    setIsAddDialogOpen(false);
  };

  useEffect(() => {
    const calculatedPages = Math.ceil((data?.data.length || 0) / itemsPerPage);
    setTotalPages(calculatedPages || 1);
  }, [data, itemsPerPage]);

  const handleOnEdit = (item: RupeExam) => {
    setIsEditDialogOpen(true);
    setSelectedItemData(item);
  };

  const handleUpdateData = async (updatedItem: RupesToUpdate) => {
    try {
      await rupesService.update(selectedItemData!.id, updatedItem);
      await refetchRupes();
      setIsEditDialogOpen(false);
    } catch (error) {
      toastErrorConfig("Erro ao atualizar item", error);
    }
  };

  const handleDelete = (id: string) => {
    setRupesIdToDelete(id);
    setConfirmDelete(true);
  };

  const handleDeleteData = async () => {
    if (!rupesIdToDelete) {
      toastErrorConfig("ID do item para exclusão está indefinido");
      return;
    }
    try {
      await rupesService.delete(rupesIdToDelete);
      await refetchRupes();
      handleParamChange({
        key: "rupes",
        value: "empty",
        searchParamsHelpers: { searchParams, navigate },
      });
      setConfirmDelete(false);
      setSearchParams({ page: "1" });
    } catch (error) {
      toastErrorConfig("Erro ao deletar item", error);
    }
  };

  const handleSelectionChange = (value: string) => {
    handleParamChange({
      key: "state",
      value,
      searchParamsHelpers: { searchParams, navigate },
    });
    setSelectedState(value);
  };

  // const handleItemsPerPageChange = (quantity: string) => {
  //   setItemsPerPage(parseInt(quantity));
  //   setSearchParams({ page: "1", itemsPerPage: quantity });
  // };

  const filteredData = data?.data.filter((item) => {
    const matchesSearchTerm =
      item.n_referencia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.n_gpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesState =
      selectedState === undefined ||
      selectedState === "empty" ||
      (selectedState === "true" && item.pago) ||
      (selectedState === "false" && !item.pago);

    return matchesSearchTerm && matchesState;
  });

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const paginatedData = filteredData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const headers = [
    "Rupe",
    "GPT",
    "Situação",
    "Estado",
    "Data de Pagamento",
    "Validade",
  ];
  const items = [
    { label: "Pago", value: "true" },
    { label: "N/Pago", value: "false" },
  ];
  const handleStateChange = async (itemId: string, newState: string) => {
    try {
      await rupesService.update(itemId, { pago: newState === "true" });
      await refetchRupes();
    } catch (error) {
      toastErrorConfig("Erro ao atualizar o estado de pagamento", error);
    }
  };
  const canCreate = hasPermission("CRIAR");
  const canEdit = hasPermission("EDITAR");
  const canDelete = hasPermission("ELIMINAR");
  return (
    <>
      <div className="p-4">
        {canCreate && (
          <div className="w-full appear border-b flex justify-end gap-2 py-4">
            <AddButton onClick={() => setIsAddDialogOpen(true)}>
              Adicionar Rupe
            </AddButton>
          </div>
        )}
        <br />
        <div className="text-xl font-bold">Filtros</div>
        <hr />
        <br />
        <div className="flex items-end justify-center w-full gap-4">
          <div className="flex gap-4">
            <div>
              <Label>Busca</Label>
              <SearchInput
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Estado</Label>
              <CustomSelector
                items={items}
                value={selectedState}
                onChange={handleSelectionChange}
              />
            </div>
          </div>
          <div className="flex flex-1 justify-end items-center gap-2">
            <Label>Por Página</Label>
            <PageQuantitySelector
              quantity={itemsPerPage}
              step={5}
              value={itemsPerPage}
              navigateFunction={navigate}
              searchParams={searchParams}
            />
          </div>
        </div>
        <div className="flex justify-end w-full my-2">
          <CustomPagination currentPage={currentPage} totalPages={totalPages} />
        </div>
        <div>
          <CustomTable
            useNumbering={true}
            data={paginatedData}
            onDelete={canDelete ? handleDelete : undefined}
            onEdit={canEdit ? handleOnEdit : undefined}
            headers={headers}
            columns={[
              { data: "n_referencia" },
              { data: "n_gpt" },
              { data: "situacao" },
              {
                data: (item) => (
                  <CustomSelector
                    value={item.pago ? "true" : "false"}
                    items={items}
                    onChange={(value: string) =>
                      handleStateChange(item.id, value)
                    }
                  />
                ),
              },
              {
                data: (item) => (
                  <input
                    type="Date"
                    value={new Date(item.data_pagamento)
                      .toISOString()
                      .split("T")}
                  />
                ),
              },
              {
                data: (item) =>
                  new Date(item.data_expiracao).toLocaleDateString(),
              },
            ]}
            getId={(item) => item.id}
          />
        </div>
        {confirmDelete && (
          <AlertDeleteDialog
            isOpen={true}
            message="Deseja deletar esse item?"
            onCancelClick={() => setConfirmDelete(false)}
            onConfirm={handleDeleteData}
            subject="Item"
          />
        )}
        <div className="flex justify-end w-full my-6">
          <CustomPagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
      <FormDialog<RupesToCreate, RupesToCreate, RupesOtherData>
        subject="Adicionar Rupe"
        description="Adicione um novo rupe"
        otherData={{ tipo_rupe: tipoRupeData?.data }}
        form={RupeAddForm}
        isOpen={isAddDialogOpen}
        onDialogCloseClick={() => setIsAddDialogOpen(false)}
        onSubmit={handleOnAddDialogSubmit}
      />
      <FormDialog<RupesToUpdate, RupesToUpdate, RupesOtherData>
        subject="Editar Rupes"
        description="Edite os dados dos rupes e clique em 'Atualizar' para finalizar a operação."
        onDialogCloseClick={() => setIsEditDialogOpen(false)}
        form={RupeEditForm}
        otherData={{ tipo_rupe: tipoRupeData?.data }}
        isOpen={isEditDialogOpen}
        data={selectedItemData}
        onSubmit={handleUpdateData}
      />
    </>
  );
}
