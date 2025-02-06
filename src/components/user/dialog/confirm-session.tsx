import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { userService } from "@/modules/services/api/user";
import { sessionService } from "@/modules/services/session";
import { LoginData } from "@/modules/validations/login";
import { useNavigate } from "react-router";

export default function ConfirmSessionDialog({
  open,
  onConfirm,
}: {
  open: boolean;
  onConfirm: () => void;
}) {
  const navigate = useNavigate();
  const handleOnSubmit = async (loginData: LoginData) => {
    const data = await userService.login(loginData);
    sessionService.set(data);
    onConfirm();
  };

  const onCancel = () => {
    navigate("/login", { replace: true });
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            Confirme suas credencias para continuar com a sessão
          </DialogTitle>
          <DialogDescription>
            Insira suas credenciais para continuar com a sessão
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <LoginForm
            successText="Sessão confirmada!"
            loadingText="Confirmando dados da sessão"
            loginButtonText="Confirmar"
            onSubmit={handleOnSubmit}
          />
        </div>
        <DialogFooter>
          <Button onClick={onCancel} variant="destructive" type="button">
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
