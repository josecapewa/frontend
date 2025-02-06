type UserLevel = {
  id: string;
  nome: string;
  descricao: string | null;
  permissoes_telas: UserLevelScreenPermission[];
};
type UserLevelToCreate = Omit<UserLevel, "id" | "permissoes_telas"> & {
  permissoes_telas: UserLevelScreenPermissionToCreate[];
};

type UserLevelToUpdate = Partial<UserLevelToCreate> & {
  permissoes_telas?: UserLevelScreenPermissionToCreate[];
};
