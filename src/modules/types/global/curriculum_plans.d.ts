type CurriculumPlan
 = {
    id: string;
    id_curso:string
    curso:Omit<Course, "area_formacao" | "nomes_turmas">
    disciplinas_plano_curricular: DisciplineCurriculumPlan[]
}
type CurriculumPlanToCreate= Omit<CurriculumPlan, "curso" |"disciplinas_plano_curricular">