import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { PersonalInfoData } from "@/modules/validations/person";
import { Input } from "../ui/input";
import IdentificationTypeSelector from "../identification-types/selector";

export type IdentificationFieldOtherData
 = {
  identificationTypes?: IdentificationType[];
}
export function IdentificationFields({
  form,
  otherData,
}: {
  form: UseFormReturn<PersonalInfoData>;
  otherData?: IdentificationFieldOtherData;
}) {
  return (
    <>
      <section className="flex gap-2 flex-1">
        <FormField
          control={form.control}
          name="id_tipo_identificacao"
          render={({ field }) => (
            <FormItem className="relative flex-1">
              <FormLabel>Tipo de Identificação</FormLabel>
              <FormControl>
                <IdentificationTypeSelector
                  identificationTypes={otherData?.identificationTypes}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="n_identificacao"
          render={({ field }) => (
            <FormItem className=" relative flex-1">
              <FormLabel>Número de identificação</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o número de identificação"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </section>
      <section className="flex flex-1 gap-2 flex-wrap">
        <FormField
          control={form.control}
          name="data_emissao"
          render={({ field }) => (
            <FormItem className="flex-1 relative">
              <FormLabel>Data de emissão</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="data_validade"
          render={({ field }) => (
            <FormItem className="flex-1 relative">
              <FormLabel>Data de validade</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </section>
    </>
  );
}
