type CardModel = {
  id: string;
  nome: string;
  created_at: Date;
  foto_frente: string | null;
  foto_verso: string | null;
  id_area_formacao: string;
  area_formacao: TrainingField;
};
type CardModelToCreate = Omit<
  CardModel,
  "id" | "created_at" | "foto_frente" | "foto_verso" | "area_formacao"
> & {
  foto_frente: File;
  foto_verso: File;
};

type CardModelToUpdate = Partial<CardModelToCreate>;
