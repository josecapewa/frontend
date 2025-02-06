import { LoginForm } from "@/components/login-form";
import { Logo } from "@/components/logo";
import { userService } from "@/modules/services/api/user";
import { sessionService } from "@/modules/services/session";
import { useAppStore } from "@/modules/services/stores/app";
import { useSessionStore } from "@/modules/services/stores/session";
import { LoginData } from "@/modules/validations/login";
import { Navigate, useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();
  const user = useSessionStore((state) => state.user);
  const loged = useAppStore((state) => state.loged);

  if ((user && user.permissoes_telas) || loged) {
    return (
      <Navigate
        to={user?.pessoa.aluno ? "/painel-do-aluno" : "/painel-principal"}
        replace
      />
    );
  }
  const handleOnSubmit = async (loginData: LoginData) => {
    const data = await userService.login(loginData);
    sessionService.set(data);
    if (data.pessoa.aluno) {
      navigate("/painel-do-aluno", { replace: true });
      return;
    }
    navigate("/painel-principal", { replace: true });
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative justify-center items-center hidden bg-zinc-100 p-10 lg:flex dark:bg-zinc-800">
        <img
          src="/recycling.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col p-6 md:p-10">
        <section className="h-full flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-6 border p-4 py-6 rounded-md">
            <Logo />
            <LoginForm onSubmit={handleOnSubmit} />
          </div>
        </section>
      </div>
    </div>
  );
}
