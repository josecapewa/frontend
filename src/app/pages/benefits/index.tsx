import BenefitCards from "@/components/benefit/data/card";
import BenefitAddForm from "@/components/benefit/form/add";
import BenefitEditForm from "@/components/benefit/form/edit";
import { toastErrorConfig } from "@/components/config/toast";
import AddButton from "@/components/custom/add-button";
import AlertDeleteDialog from "@/components/custom/alert-delete";
import FormDialog from "@/components/custom/form-dialog";
import { benefitService } from "@/modules/services/api/benefits";
import { categoryService } from "@/modules/services/api/category";
import { useSessionStore } from "@/modules/services/stores/session";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function BenefitsPage() {
  const navigate = useNavigate();

  const user = useSessionStore((state) => state.user);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [benefitToEdit, setBenefitToEdit] = useState<Benefit>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [benefitToDelete, setBenefitToDelete] = useState<string>();

  const {
    data: benefitsData,
    error: benefitsError,
    refetch: refetchBenefits,
  } = useQuery({
    queryKey: ["benefits"],
    queryFn: () => benefitService.getAll(),
  });

  const { data: categoriesData, error: categoriesError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getAll(),
  });

  if (benefitsError)
    toastErrorConfig("Erro ao carregar os benefícios", benefitsError);

  if (categoriesError)
    toastErrorConfig("Erro ao carregar as categorias", categoriesError);

  const handleOnAddConfirm = async (data: BenefitToCreate) => {
    await benefitService.create(data);
    await refetchBenefits();
    setIsAddDialogOpen(false);
  };

  const handleOnEdit = async (data: Benefit) => {
    setBenefitToEdit(data);
    setIsEditDialogOpen(true);
  };

  const handleOnEditConfirm = async (data: BenefitToUpdate) => {
    await benefitService.update(benefitToEdit?.id!, data);
    await refetchBenefits();
    setIsEditDialogOpen(false);
  };

  const handleOnDelete = async (id: string) => {
    setBenefitToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleOnDeleteConfirm = async () => {
    await benefitService.delete(benefitToDelete!);
    await refetchBenefits();
    setIsDeleteDialogOpen(false);
  };

  return (
    <section className="py-4 lg:text-xl">
      <section className="flex justify-between gap-4 items-end mb-4 flex-wrap">
        <div className="mt-2 flex flex-col gap-2 flex-wrap w-max">
          <section className="flex gap-3 items-end"></section>
        </div>
        <section className="flex gap-3 items-end">
          {user?.tipo === "master" && (
            <AddButton onClick={() => setIsAddDialogOpen(true)}>
              Adicionar Troca
            </AddButton>
          )}
        </section>
      </section>
      <BenefitCards
        benefits={benefitsData?.data}
        onEdit={handleOnEdit}
        onDelete={handleOnDelete}
        onClick={(benefit) => {
          navigate(`/beneficios/${benefit.id}`);
        }}
      />

      <FormDialog
        subject="Adicionar Benefício"
        description="Adicione um novo benefício"
        form={BenefitAddForm}
        isOpen={isAddDialogOpen}
        onDialogCloseClick={() => setIsAddDialogOpen(false)}
        onSubmit={handleOnAddConfirm}
        otherData={{ categories: categoriesData?.data }}
      />

      <FormDialog
        subject="Editar Benefício"
        description="Edite um benefício"
        form={BenefitEditForm}
        isOpen={isEditDialogOpen}
        onDialogCloseClick={() => setIsEditDialogOpen(false)}
        onSubmit={handleOnEditConfirm}
        data={benefitToEdit}
        otherData={{ categories: categoriesData?.data }}
      />

      <AlertDeleteDialog
        subject="Benefício"
        message="Tem certeza que deseja deletar este benefício?"
        isOpen={isDeleteDialogOpen}
        onConfirm={handleOnDeleteConfirm}
        onCancelClick={() => setIsDeleteDialogOpen(false)}
      />
    </section>
  );
}
