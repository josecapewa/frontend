type User = {
  id: string;
  id_pessoa: string;
  nome_usuario: string;
  foto: string | null;
  password: string;
  is_master: boolean;
  pessoa: Person;
  permissoes_telas: UserScreenPermission[];
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
