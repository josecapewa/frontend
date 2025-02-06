type LiteraryQualification = {
  id: string;
  nome: string;
};

type LiteraryQualificationToCreate = Omit<LiteraryQualification, "id">;

type LiteraryQualificationToUpdate = Partial<LiteraryQualificationToCreate>;
