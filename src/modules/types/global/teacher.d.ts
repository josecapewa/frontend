interface Teacher {
  id: string;
  id_pessoa: string;
  data_inicio_ipil: Date;
  data_inicio_educacao: Date;
  id_habilitacao_literaria: string;
  id_categoria: string;
  id_regime_laboral: string | null;
  id_cargo_pedagogico: string;
  n_agente: string;
  foto_original?: string;
  pessoa: Person;
  habilitacao_literaria: LiteraryQualification | null;
  categoria: Category | null;
  regime_laboral: LaborRegime | null;
  professor_disciplinas: TeacherDiscipline[];
  director_de_turmas: ClassDirector[];
  cargo_pedagogico: PedagogicalRole | null;
}

interface TeacherToCreate {
  id_categoria: string;
  id_habilitacao_literaria: string;
  id_regime_laboral: string;
  id_cargo_pedagogico: string;
  pessoa: PersonToCreate;
  id_disciplinas: string[];
}

interface TeacherSimpleData {
  nome: string;
  genero: boolean;
  data_inicio_ipil?: Date;
  data_inicio_educacao?: Date;
  n_agente: string;
  id_disciplinas: string[];
}
