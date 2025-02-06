type DisciplineWorkload = {
  id: string;
  id_disciplina: string;
  id_classe: string;
  n_ordem?: number;
  carga_horaria?: number;
  disciplina: Discipline;
  classe: Grade;
};
type DisciplineWorkloadToEdit = Omit<
  DisciplineWorkload,
  "disciplina" | "classe" | "id"
> & {
  disciplina: string;
  classe?: Grade;
  id_plano_curricular: string;
  id_disciplina_carga_horaria: string;
};

type DisciplineworkloadToCreate = Omit<
  DisciplineWorkload,
  "id" | "disciplina" | "classe"
> & {
  id_plano_curricular: string;
};

type DisciplineWorkloadToUpdate = Partial<DisciplineworkloadToCreate> & {
  disciplina: string;
  classe: Grade;
};
