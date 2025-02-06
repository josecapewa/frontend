type MiniPauta
 = {
    id: string;
    id_aluno_turma: string;
    id_disciplina: string;
    id_trimestre: string;
    p1: string | null;
    p2: string | null;
    p3: string | null;
    aluno_turma: StudentInClass;
    disciplina: Discipline;
    trimestre: Trimester;
}
type MiniPautaToCreate= Omit<MiniPauta, 'id' | 'aluno_turma' | 'disciplina' | 'trimestre'>

type MiniPautaToUpdate = Partial<MiniPautaToCreate>