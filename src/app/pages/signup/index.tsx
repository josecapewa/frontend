import { toastPromiseConfig } from "@/components/config/toast";
import RegisterForm, { SignUpData } from "@/components/register-form";
import { userService } from "@/modules/services/api/user";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const navigate = useNavigate();
  const handleSubmit = async (data: SignUpData) => {
    toastPromiseConfig({
      fn: userService
        .create({
          ...data,
          email_recuperacao: data.email,
        })
        .then(() => navigate("/login")),
      loading: "Criando conta",
      success: "Conta criada com sucesso, faça login para continuar",
    });
  };
  return <RegisterForm onSubmit={handleSubmit} />;
}
