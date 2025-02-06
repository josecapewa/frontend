type DisciplineCurriculumPlan
 = {
    id: string;
    id_plano_curricular: string;
    id_disciplina: string;
    n_ordem: number;
    disciplina: Discipline;
    cargas_horarias_classe: GradeWorkload[];
}
type DisciplineCurriculumPlanToCreate= Omit<DisciplineCurriculumPlan, "id" | "disciplina" |"cargas_horarias_classe">

type DisciplineCurriculumPlanToUpdate = Partial<DisciplineCurriculumPlanToCreate>