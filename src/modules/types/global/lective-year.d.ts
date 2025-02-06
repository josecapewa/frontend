type LectiveYear
 = {
  ano_lectivo: string;
  data_inicio: string;
  data_fim: string;
  is_closed: boolean;
  id: string;
}
 type LectiveYearToCreate= Omit<LectiveYear, "id">
type LectiveYearToUpdate = Partial<LectiveYear>
