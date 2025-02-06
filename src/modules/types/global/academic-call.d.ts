type AcademicCall = {
  id: string;
  id_arquivo: string;
  id_aluno_turma: string;
  data_emissao: Date;
  aluno_turma: IAcademicCallStudent;
};
type AcademicCallStudent = Omit<StudentInClass, "turma"> & {
  turma: IAcademicCallClass;
};

type AcademicCallClass = {
  nome_turma: Omit<ClassName, "curso" | "classe">;
};
