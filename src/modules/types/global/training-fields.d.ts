type TrainingField = {
  id: string;
  nome: string;
  abreviacao: string;
  cursos?: Omit<Course, "area_formacao">[];
};
type TrainingFieldTotalCourses = TrainingField & {
  total_cursos: number;
};
type TrainingFieldTotalTeachers = TrainingField & {
  total_professores: number;
};

type TrainingFieldStatus = TrainingField & {
  total_cursos: number;
  total_professores: number;
  total_turmas: number;
  total_alunos_masculino: number;
  total_alunos_feminino: number;
  total_alunos: number;
};
type TrainingFieldToCreate = Omit<TrainingField, "id">;
type TrainingFieldToUpdate = Partial<TrainingFieldToCreate>;
