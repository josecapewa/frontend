type Turn = {
  turno: string;
  id: string;
  id_periodo: string;
  periodo: Period;
};
type TurnToCreate = Omit<Turn, "id" | "periodo">;

type TurnToUpdate = Partial<TurnToCreate>;
