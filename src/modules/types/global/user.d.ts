type User = {
  id: string;
  nome: string;
  email: string;
  email_recuperacao: string | null;
  senha: string;
  telefone: string;
  pontos: number;
  foto: string | null;
  tipo: string;
};
type UserToCreate = Omit<User, "id" | "pontos" | "foto" | "tipo">;

type UserToUpdate = Partial<UserToCreate>;
