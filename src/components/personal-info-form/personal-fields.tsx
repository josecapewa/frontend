import { PersonalInfoData } from "@/modules/validations/person";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export function PersonalFields({
  form,
  person = "indivíduo",
}: {
  form: UseFormReturn<PersonalInfoData>;
  person?: string;
}) {
  return (
    <>
      <FormField
        control={form.control}
        name="nome"
        render={({ field }) => (
          <FormItem className=" relative">
            <FormLabel>Nome do {person}</FormLabel>
            <FormControl>
              <Input
                placeholder={`Digite o nome completo do ${person}`}
                type="text"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="nome_pai"
        render={({ field }) => (
          <FormItem className=" relative">
            <FormLabel>Nome do Pai</FormLabel>
            <FormControl>
              <Input
                placeholder={`Digite o nome completo do pai do ${person}`}
                type="text"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="nome_mae"
        render={({ field }) => (
          <FormItem className=" relative">
            <FormLabel>Nome da Mãe</FormLabel>
            <FormControl>
              <Input
                placeholder={`Digite o nome completo da mãe do ${person}`}
                type="text"
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="residencia"
        render={({ field }) => (
          <FormItem className="flex-1 relative">
            <FormLabel>Residência</FormLabel>
            <FormControl>
              <Input placeholder="Digite a residência" type="text" {...field} />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </>
  );
}
