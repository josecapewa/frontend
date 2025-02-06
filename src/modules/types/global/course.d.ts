type Course
 = {
  id: string;
  nome: string;
  id_area_formacao: string;
  codigo_curso: string;
  area_formacao: TrainingField;
  nomes_turmas: ClassName[];
}
type CourseWithoutClassNames= Omit<Course, "nomes_turmas">



type CourseToCreate
 = {
  nome: string;
  id_area_formacao: string;
  codigo_curso: string;
}
 type CourseToUpdate = Partial<CourseToCreate>
