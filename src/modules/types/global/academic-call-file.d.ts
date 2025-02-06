type AcademicCallFile
 = {
  id: string;
  id_arquivo: string;
  arquivo: IFile;
  convocatorias: IAcademicCall[];
}
type AcademicCallFileToCreate
 = {
  pdf: File;
  alunos_turmas: AcademicCallFileStudentInClass[];
  _class: string;
}
type AcademicCallFileStudentInClass
 = {
  id: string;

  n_turma: number;
}