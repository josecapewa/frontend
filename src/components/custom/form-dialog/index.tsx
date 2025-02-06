import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ComponentType } from "react";

interface IFormDialogProps<TData, TDefaultValues, TOtherData> {
  onSubmit: (data: TData) => Promise<void>;
  onDialogCloseClick: () => void;
  isOpen: boolean;
  description?: string;
  subject: string;
  data?: TDefaultValues;
  otherData?: TOtherData;
  form: ComponentType<{
    onSubmit: (data: TData) => Promise<void>;
    defaultValues?: TDefaultValues;
    otherData?: TOtherData;
    
  }>;
}

export default function FormDialog<TData, TDefaultValues, TOtherData>({
  onSubmit,
  onDialogCloseClick,
  isOpen,
  description,
  form,
  subject,
  data,
  otherData,
}: IFormDialogProps<TData, TDefaultValues, TOtherData>) {
  const Form = form;

  const handleSubmit = async (data: TData) => {
    await onSubmit(data).finally(() => {
      onDialogCloseClick?.();
    });
  };
  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="custom_scroll"
        onDialogCloseClick={onDialogCloseClick}
      >
        <DialogHeader>
          <DialogTitle>{subject}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form
          onSubmit={handleSubmit}
          defaultValues={data}
          otherData={otherData}
        />
      </DialogContent>
    </Dialog>
  );
}
