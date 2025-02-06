"use client";
import { toastPromiseConfig } from "@/components/config/toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export default function AlertDeleteDialog({
  onConfirm,
  isOpen,
  onCancelClick,
  message,
  subject,
}: {
  onConfirm: () => Promise<void>;
  onCancelClick: () => void;
  isOpen: boolean;
  message: string;
  subject: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onConfirmClick = () => {
    if (!onConfirm) return;
    setIsLoading(true);
    toastPromiseConfig({
      fn: onConfirm().finally(() => {
        setIsLoading(false);
        onCancelClick();
      }),
      loading: `Eliminando ${subject.toLowerCase()}...`,
      success: `${
        subject[0].toUpperCase() + subject.slice(1)
      } eliminado com sucesso`,
    });
  };
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem a certeza?</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} onClick={onCancelClick}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction disabled={isLoading} onClick={onConfirmClick}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
