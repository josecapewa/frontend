type LaborRegime = {
  id: string;
  regime: string;
};

type LaborRegimeToCreate = Omit<LaborRegime, "id">;

type LaborRegimeToUpdate = Partial<LaborRegimeToCreate>;
