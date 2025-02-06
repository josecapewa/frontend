type Period = {
  id: string;
  nome: string;
};
type PeriodToCreate = Omit<Period, "id">;
type PeriodToUpdate = Partial<PeriodToCreate>;
