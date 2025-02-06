type Student = {
  id: string;
  n_processo: string;
  pessoa: Person;
  foto_original?: string;
  aluno_turma: StudentInClass;
  encarregado?: EducationOfficer;
};
type StudentToCreate = Omit<Person, "id"> & {
  n_processo: number;
  id_turma: string;
};

type StudentToUpdate = Omit<Partial<Student>, "pessoa"> & {
  pessoa: Partial<Person>;
};
