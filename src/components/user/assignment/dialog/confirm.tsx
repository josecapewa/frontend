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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getFirstAndLastName } from "@/modules/helpers/names";
import { assignUserSchema } from "@/modules/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type UserAssignData = z.infer<typeof assignUserSchema>;

export default function AssignUserDialog({
  open,
  onConfirm,
  personalData,
  onCancel,
}: {
  open: boolean;
  onConfirm: (telefone: string) => void;
  personalData?: Person;
  onCancel: () => void;
}) {
  const form = useForm<UserAssignData>({
    resolver: zodResolver(assignUserSchema),
    defaultValues: {
      telefone: "",
    },
  });

  const phone = form.watch("telefone");

  const handleOnSubmit = ({ telefone }: UserAssignData) => {
    onConfirm(telefone);
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Pretende tornar {personalData?.nome} um usuário?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ao fazer isso permitirá que ele acesse ao sistema. Confirme se quer
            tornar {getFirstAndLastName(personalData?.nome || "")} um usuário...
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            className="[&>*]:w-full w-full mx-auto"
            onSubmit={form.handleSubmit(handleOnSubmit)}
          >
            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex.: 923321377" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel onClick={onCancel} type="button">
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={!phone || phone.trim() === "" || phone.length < 9}
                type="submit"
              >
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
