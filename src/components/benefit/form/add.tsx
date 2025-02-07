import { toastPromiseConfig } from "@/components/config/toast";
import CustomSelector from "@/components/custom/selector";
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
import { benefitValidations } from "@/modules/validations/benefit";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export type BenefitOtherData = {
  categories?: Category[];
};

export default function BenefitAddForm({
  onSubmit,
  otherData,
}: {
  onSubmit: (data: BenefitToCreate) => Promise<void>;
  otherData?: BenefitOtherData;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<BenefitToCreate>({
    resolver: zodResolver(benefitValidations),
  });

  const handleOnSubmit = async (data: BenefitToCreate) => {
    setIsLoading(true);
    toastPromiseConfig({
      fn: onSubmit(data).finally(() => setIsLoading(false)),
      loading: "A adicionar benefício...",
      success: "Benefício adicionado com sucesso.",
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
              <FormLabel>Nome do Benefício</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex.: 50 minutos para todas as operadoras nacionais"
                  {...field}
                />
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
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ex.: Fale para todas as operadoras nacionais durante 50 minutos"
                  {...field}
                ></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pontos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pontos necessários</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ex.: 50"
                  min={0}
                  {...field}
                  value={field.value ? Number(field.value) : ''}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id_categoria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <CustomSelector
                  items={otherData?.categories?.map((category) => ({
                    label: category.nome,
                    value: category.id,
                  }))}
                  unSelectedLabel="Selecione a categoria"
                  useEmptyOption
                  emptyLabel="Nenhuma categoria cadastrada"
                  {...field}
                />
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
