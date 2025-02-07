type Benefit = {
  id: string;
  nome: string;
  descricao: string;
  pontos: number;
  estado: boolean;
  id_categoria: string;
  created_at: Date;
  referencias?: Reference[];
};

type BenefitToCreate = Omit<Benefit, "id" | "created_at">;

type BenefitToUpdate = Partial<BenefitToCreate>;