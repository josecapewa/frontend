type Grade
 = {
  id: string;
  designacao: string;
  numero: number;
  id_ciclo?: string;
  ciclo?: Cycle;
}
type GradeToCreate= Omit<Grade, "id" | "ciclo">

type GradeToUpdate = Partial<Grade>
