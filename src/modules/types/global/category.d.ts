type Category = {
  id: string;
  nome: string;
  descricao: string;
};

type CategoryToCreate = Omit<Category, "id">;

type CategoryToUpdate = Partial<CategoryToCreate>;
