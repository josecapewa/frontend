type UserScreenPermission = {
  id: string;
  id_usuario: string;
  caminho_tela: string;
  permissao: Permission;
};

type UserScreenPermissionToCreate = Omit<
UserScreenPermission,
  "id" | "id_usuario"
>;
