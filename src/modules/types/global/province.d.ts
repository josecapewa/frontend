type Province = {
  id: string;
  nome: string;
};
type ProvinceToCreate = Omit<Province, "id">;
type ProvinceToUpdate = Partial<ProvinceToCreate>;
