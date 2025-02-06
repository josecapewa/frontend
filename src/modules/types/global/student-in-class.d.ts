type StudentInClass = {
  id: string;
  id_aluno: string;
  id_turma: string;
  n_turma: number;
  aluno: Omit<Student, "turmas">;
  turma: Class;
};
type StudentInClassToCreate = Omit<StudentInClass, "id">;
type StudentInClassToUpdate = Partial<StudentInClassToCreate>;

type StudentInClassCard = StudentInClass & {
  emissoes_cartao: ICardEmission[];
};
