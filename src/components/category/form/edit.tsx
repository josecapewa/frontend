import { toastPromiseConfig } from "@/components/config/toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { categoryValidations } from "@/modules/validations/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CategoryEditForm({
    onSubmit,
    defaultValues
}: {
        onSubmit: (data: CategoryToUpdate) => Promise<void>;
    defaultValues?: CategoryToUpdate;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<CategoryToUpdate>({
      resolver: zodResolver(categoryValidations),
      defaultValues,
  });

  const handleOnSubmit = async (data: CategoryToUpdate) => {
    setIsLoading(true);
    toastPromiseConfig({
      fn: onSubmit(data).finally(() => setIsLoading(false)),
      loading: "A atualizar categoria...",
      success: "Categoria atualizada com sucesso.",
    });
  };

  return (
    <Form {...form}>
      <form
        className="[&>*]:w-full w-full mx-auto"
        onSubmit={form.handleSubmit(handleOnSubmit)}
      >
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da categoria</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: Voz e SMS" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ex.: Transforme suas recompensas em comunicações significativas. Conecte-se de forma inteligente e aproveite cada ponto acumulado!"
                  {...field}
                ></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} className="w-full mt-5" type="submit">
          Editar
        </Button>
      </form>
    </Form>
  );
}
