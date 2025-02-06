import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useState } from "react";
import { toastPromiseConfig } from "../../config/toast";
import { documentTypeSchema } from "@/modules/validations/document-type";

export default function DocumentTypeAddForm({
  onSubmit,
}: {
  onSubmit: (data: FileTypeToCreate) => Promise<void>;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FileTypeToCreate>({
    resolver: zodResolver(documentTypeSchema),
  });

  const handleOnSubmit = async (data: FileTypeToCreate) => {
    setIsLoading(true);
    toastPromiseConfig({
      fn: onSubmit(data).finally(() => setIsLoading(false)),
      loading: "A criar tipo de documento...",
      success: "Tipo de documento criada com sucesso.",
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
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: Certificado" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} className="w-full mt-5" type="submit">
          Criar
        </Button>
      </form>
    </Form>
  );
}
