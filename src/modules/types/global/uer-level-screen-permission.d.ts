type UserLevelScreenPermission = {
  id: string;
  id_nivel: string;
  caminho_tela: string;
  permissao: Permission;
};

type UserLevelScreenPermissionToCreate = Omit<
  UserLevelScreenPermission,
  "id" | "id_nivel"
>;
