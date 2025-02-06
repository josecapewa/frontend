import AppLoading from "@/app/loading";
import { userService } from "@/modules/services/api/user";
import { useSessionStore } from "@/modules/services/stores/session";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { toastErrorConfig } from "../config/toast";
import { useAppStore } from "@/modules/services/stores/app";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const user = useSessionStore((state) => state.user);
  const loged = useAppStore((state) => state.loged);
  const setLoged = useAppStore((state) => state.setLoged);
  const setUser = useSessionStore((state) => state.setUser);
  const setTargetPath = useAppStore((state) => state.setTargetPath);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!loged) {
      setTargetPath(pathname);
      navigate("/login");
      return;
    }
    if (user) {
      setLoading(false);
      return;
    }
    const fetchUser = async () => {
      try {
        const userData = await userService.getSession();
        if (userData) {
          setUser(userData);
          setLoading(false);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toastErrorConfig("Erro ao buscar dados do usuário", error);
          setLoading(false);
          setLoged(false);
          setUser(null);
          setTargetPath(pathname);
          navigate("/login");
        }
      }
    };
    fetchUser();
  }, [user]);

  if (loading) {
    return <AppLoading />;
  }

  if (user === null || !user.permissoes_telas) {
    return <Navigate to="/login" />;
  }

  const isStudent = user.pessoa.aluno !== null;
  const hasPermission =
    user.permissoes_telas.some((perm) => perm.caminho_tela === pathname) ||
    (isStudent && pathname === "/painel-do-aluno") ||
    (!isStudent && pathname === "/painel-principal") ||
    user.is_master;

  if (hasPermission) {
    return children;
  }

  return <Navigate to={isStudent ? "/painel-do-aluno" : "/painel-principal"} />;
}
