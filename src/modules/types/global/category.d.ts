type Category = {
  id: string;
  categoria: string;
};

type CategoryToCreate = Omit<Category, "id">;

type CategoryToUpdate = Partial<CategoryToCreate>;
