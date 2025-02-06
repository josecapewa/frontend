type CardFile
 = {
  id: string;
  id_arquivo: string;
  arquivo: IFile;
  emissoes_cartoes: ICardEmission[];
}
 type CardFileToCreate
 = {
  pdf: File;
  alunos_turmas: CardFileStudentInClass[];
  _class: string;
}
type CardFileStudentInClass
 = {
  id: string;
  via: number;
  n_turma: number;
}