type Discipline
 = {
  id: string;
  nome: string;
  id_tipo_disciplina: string;
  abreviacao: string;
  tipo: DisciplineType;
}
 type DisciplineToCreate= Omit<Discipline, "id" | "tipo">

type DisciplineToUpdate = Partial<DisciplineToCreate>