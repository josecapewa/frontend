type GradeWorkload
 = {
  id: string;
  id_disciplina_plano_curricular: string;
  id_classe: string;
  carga_horaria: number;
  classe?: Grade;
}
 type GradeWorkloadToCreate= Omit<GradeWorkload, "id" | 'classe'>

type GradeWorkloadToUpdate = Partial<GradeWorkload>
