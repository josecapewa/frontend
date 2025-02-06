type CardEmission = {
  id: string;
  id_aluno_turma: string;
  id_arquivo: string;
  via: number;
  estado: string | null;
  data_emissao: Date;
  aluno_turma: ICardEmissionStudent;
};
type CardEmissionStudent = Omit<StudentInClass, "turma"> & {
  turma: ICardEmissionClass;
};

type CardEmissionClass = {
  nome_turma: Omit<ClassName, "curso" | "classe">;
};
