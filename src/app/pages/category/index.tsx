import CategoriesCardView from "@/components/category/data/card";
import CategoryAddForm from "@/components/category/form/add";
import CategoryEditForm from "@/components/category/form/edit";
import { toastErrorConfig } from "@/components/config/toast";
import AddButton from "@/components/custom/add-button";
import AlertDeleteDialog from "@/components/custom/alert-delete";
import FormDialog from "@/components/custom/form-dialog";
import { categoryService } from "@/modules/services/api/category";
import { useSessionStore } from "@/modules/services/stores/session";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function CategoryPage() {
  const user = useSessionStore((state) => state.user);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category>();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string>();

  const {
    data: categoriesData,
    error: categoriesError,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getAll(),
  });

  if (categoriesError)
    toastErrorConfig("Erro ao carregar as categorias", categoriesError);

  const handleOnAddConfirm = async (data: CategoryToCreate) => {
    await categoryService.create(data);
    await refetchCategories();
    setIsAddDialogOpen(false);
  };

  const handleOnEdit = async (data: Category) => {
    setCategoryToEdit(data);
    setIsEditDialogOpen(true);
  };

  const handleOnEditConfirm = async (data: CategoryToUpdate) => {
    await categoryService.update(categoryToEdit?.id!, data);
    await refetchCategories();
    setIsEditDialogOpen(false);
  };

  const handleOnDelete = async (id: string) => {
    setCategoryToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleOnDeleteConfirm = async () => {
      await categoryService.delete(categoryToDelete!);
      await refetchCategories();
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
              Adicionar categoria
            </AddButton>
          )}
        </section>
      </section>

      <CategoriesCardView
        categories={categoriesData?.data}
        onEdit={handleOnEdit}
        onDelete={handleOnDelete}
      />

      <FormDialog
        subject="Categoria"
        description="Adicione uma nova categoria"
        form={CategoryAddForm}
        isOpen={isAddDialogOpen}
        onDialogCloseClick={() => setIsAddDialogOpen(false)}
        onSubmit={handleOnAddConfirm}
      />

      <FormDialog
        subject="Categoria"
        description="Editar categoria"
        form={CategoryEditForm}
        data={categoryToEdit}
        isOpen={isEditDialogOpen}
        onDialogCloseClick={() => setIsEditDialogOpen(false)}
        onSubmit={handleOnEditConfirm}
      />

      <AlertDeleteDialog
        subject="Categoria"
        message="Tem certeza que deseja excluir esta categoria?"
        isOpen={isDeleteDialogOpen}
        onConfirm={handleOnDeleteConfirm}
        onCancelClick={() => setIsDeleteDialogOpen(false)}
      />
    </section>
  );
}
