type ClassName
 = {
  id: string;
  id_curso: string;
  id_classe: string;
  turma: string;
  designacao: string;
  curso: Omit<Course,  "nomes_turmas">;
  classe: Grade;
}
 type ClassNameToCreate
 = Omit<ClassName, "id" | "curso" | "classe">
type ClassNameToUpdate = Partial<ClassNameToCreate>
