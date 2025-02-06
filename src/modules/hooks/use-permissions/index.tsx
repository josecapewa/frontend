import { useSessionStore } from "@/modules/services/stores/session";
import { useLocation } from "react-router";

export function usePermissions() {
  const user = useSessionStore((state) => state.user);
  const { pathname } = useLocation();
  const screenPermissions =
    user?.permissoes_telas
      .filter((perm) => perm.caminho_tela === pathname)
      .map((perm) => perm.permissao) || [];

  const hasPermission = (requiredPermission: Permission) =>
    screenPermissions.includes(requiredPermission) || user?.is_master || false;

  return { hasPermission, screenPermissions };
}
