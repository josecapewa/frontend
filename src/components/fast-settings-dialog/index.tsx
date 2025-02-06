import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import ViewStyleSelector from "../view-styles/selector";

export default function FastSettingsDialog({
  isOpen,
  onDialogCloseClick,
}: {
  isOpen: boolean;
  onDialogCloseClick: () => void;
}) {
  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="custom_scroll"
        onDialogCloseClick={onDialogCloseClick}
      >
        <DialogHeader>
          <DialogTitle>Configurações rápidas</DialogTitle>
          <DialogDescription>
            Faça alterações em de aspectos gerais do sistema com um clique
          </DialogDescription>

          <Label className="max-w-max flex flex-col gap-2">
            Estilo de visualização
            <ViewStyleSelector />
          </Label>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
