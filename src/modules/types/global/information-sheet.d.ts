type InformationSheet
 = {
  aluno_turma: StudentInClass
  pessoa: Person
}

type InformationSheetToCreate= Omit<MiniPauta, 'id'>

type InformationSheetToUpdate= Omit<MiniPauta, 'id'>