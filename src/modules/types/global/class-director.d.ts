type ClassDirector = {
  id: string;
  id_professor: string;
  id_turma: string;
  professor: Teacher;
  turma: ClassDirectorClass;
};

type ClassDirectorClass = {
  nome_turma: Pick<ClassName, "designacao">;
};

type ClassDirectorToCreate = Omit<ClassDirector, "id">;

type ClassDirectorToUpdate = Partial<ClassDirectorToCreate>;
