type Class = {
  id: string;
  is_closed: boolean;
  id_nome_turma: string;
  id_turno: string;
  id_sala: string;
  turno: Turn;
  sala: Room;
  nome_turma: ClassName;
};
type ClassStatus = {
  id: string;
  sala?: Room;
  designacao: string;
  total_alunos: number;
  total_masculino: number;
  total_feminino: number;
};
type ClassToCreate = Omit<Class, "id" | "sala" | "is_closed">;

type ClassToUpdate = Partial<ClassToCreate>;
