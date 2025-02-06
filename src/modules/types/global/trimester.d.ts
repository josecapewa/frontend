type Trimester = {
  id: string;
  trimestre: string;
};
type TrimesterToCreate = Omit<Trimester, "id">;

type TrimesterToUpdate = Partial<TrimesterToCreate>;
