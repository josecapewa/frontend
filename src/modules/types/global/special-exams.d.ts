type RupeExam = {
  id: string;
  rupe: string;
  gpt: string;
  usado: boolean;
  valor: number;
  obs?: string;
  data_validade: string;
  aluno_rupe_exame?: Omit<StudentRupeExam, "rupe_exame">;
};

type StudentRupeExam = {
  id: string;
  id_aluno: string;
  id_rupe: string;
  id_rupe_base: string;
  pago: boolean;
  afirma: boolean;
  data_criacao: string;
  data_pagamento?: string;
  aluno_exame?: StudentExam;
  rupe_exame?: RupeExam;
};

type StudentExam = {
  id: string;
  nome: string;
  n_inscricao: string;
  n_processo: string;
  n_telefone: string;
  n_bi: string;
  genero: string;
  data_nascimento: string;
  turma: string;
  numero_sala: number;
  ano_lectivo: string;
  nome_pai?: string;
  nome_mae?: string;
  provincia?: string;
  curso: string;
  pode_emitir: boolean;
  notificado: boolean;
  motivo_notificacao?: string;
  inscrito_em: string;
  data_notificacao?: string;
  data_suspensao?: string;
  declaracao?: string;
  disciplinas_eliminadas?: EliminatedDiscipline[];
  disciplinas_deixadas?: LeftDiscipline[];
  alunos_rupes_exames: StudentRupeExam[];
  primeiro_ano?: Year;
  segundo_ano?: Year;
  terceiro_ano?: Year;
  quarto_ano?: Year;
};

type EliminatedDiscipline = {
  id: string;
  id_disciplina: string;
  id_aluno: string;
  nota: number;
  disciplina: Discipline;
};

type LeftDiscipline = {
  id: string;
  id_disciplina: string;
  id_aluno: string;
  nota: number;
  disciplina: Discipline;
};

type Year = {
  id: string;
  turma?: string;
  ano_lectivo?: string;
  numero?: number;
};
