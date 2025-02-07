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

  useEffect(() => {
    if (!loged) {
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
          console.log()
          setUser(null);
          navigate("/login");
        }
      }
    };
    fetchUser();
  }, [user]);

  if (loading) {
    return <AppLoading />;
  }

  if (user === null) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
