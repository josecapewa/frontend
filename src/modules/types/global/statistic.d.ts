type CourseTotalStudents = {
  nome: string;
  codigo_curso: string;
  total_masculinos: number;
  total_femininos: number;
};
type TrainingFieldTotalCourses = {
  nome: string;
  abreviacao: string;
  total_cursos: number;
};

type PhotoInfo = {
  withPhoto: number;
  withoutPhoto: number;
};
type TraningFieldTotalStudents = {
  nome: string;
  abreviacao: string;
  total_alunos: number;
};
type GradesTotalStudents = {
  designacao: string;
  total_masculinos: number;
  total_femininos: number;
};
type CoursesNotes = {
  nome: string;
  codigo_curso: string;
  total_positives: number;
  total_negatives: number;
};
type Best5ClassesStudents = {
  designacao: string;
  students: {
    aluno: {
      n_processo: string;
      pessoa: {
        nome: string;
        foto: string | null;
      };
    };
    turma: {
      designacao: string;
      id: string;
    };
    n_turma: number;
    media_final: string;
  }[];
  id_classe: string;
};
