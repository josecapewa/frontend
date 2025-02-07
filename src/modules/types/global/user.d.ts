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
type UserToCreate = Omit<
  User,
  | "id"
  | "permissoes_telas"
  | "pessoa"
  | "password"
  | "id_pessoa"
  | "is_master"
  | "foto"
> & {
  nome: string;
  genero: boolean;
  telefone: string;
  permissoes_telas?: UserScreenPermissionToCreate[];
};

type UserToUpdate = Partial<UserToCreate> & {
  permissoes_telas?: UserScreenPermissionToCreate[];
};
