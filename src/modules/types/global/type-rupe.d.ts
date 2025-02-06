type TipoRupe = {
  id: string;
  descricao: string;
  valor: number;
  rupes: Rupes[];
};
type TipoRupeToCreate = Omit<TipoRupe, "id" | "rupes">;

type TipoRupeToUpdate = Partial<TipoRupe>;
