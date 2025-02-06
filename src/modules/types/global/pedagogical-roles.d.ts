type PedagogicalRole = {
  id: string;
  nome: string;
};

type PedagogicalRoleToCreate = Omit<PedagogicalRole, "id">;

type PedagogicalRoleToUpdate = Partial<PedagogicalRoleToCreate>;
