type Phone = {
  id: string;
  id_pessoa: string;
  numero: string;
  observacao: string | null;
  pessoa?: Person;
};

type PhoneToCreate = Omit<Phone, "id" | "pessoa">;

type PhoneToUpdate = Partial<PhoneToCreate>;