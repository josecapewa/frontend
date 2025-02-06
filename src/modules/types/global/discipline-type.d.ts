type DisciplineType
 = {
  id: string;
  tipo_disciplina: string;
}
 type DisciplineTypeToCreate= Omit<DisciplineType, "id" >
type DisciplineTypeToUpdate = Partial<DisciplineTypeToCreate>
