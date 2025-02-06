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
import { getAge } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import CustomSelector from "../custom/selector";

type ComplementarFieldsOtherData = {
  maritalStatus?: MaritalStatus[];
};
export function ComplementarFields({
  form,
}: {
  form: UseFormReturn<PersonalInfoData>;
  otherData?: ComplementarFieldsOtherData;
}) {
  return (
    <>
      <section className="flex w-full gap-2">
        <FormField
          control={form.control}
          name="id_estado_civil"
          render={({ field }) => (
            <FormItem className="flex-1 relative">
              <FormLabel>Estado Civil</FormLabel>
              <FormControl>
                <CustomSelector
                  items={[
                    { label: "Solteiro", value: "solteiro" },
                    { label: "Casado", value: "casado" },
                    { label: "Divorciado", value: "divorciado" },
                    { label: "Viúvo", value: "viuvo" },
                  ]}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id_genero"
          render={({ field }) => (
            <FormItem className="flex-1 relative">
              <FormLabel>Gênero</FormLabel>
              <FormControl>
                <CustomSelector
                  items={[
                    { label: "Masculino", value: "masculino" },
                    { label: "Feminino", value: "feminino" },
                  ]}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </section>
      <section className="flex w-full gap-2">
        <FormField
          control={form.control}
          name="altura"
          render={({ field }) => (
            <FormItem className="flex-1 relative">
              <FormLabel>Altura</FormLabel>
              <FormControl>
                <Input
                  step={0.01}
                  placeholder="Digite a altura do  aluno"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <div className="relative w-full flex flex-1">
          <FormField
            control={form.control}
            name="data_nascimento"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Data de nascimento</FormLabel>
                <FormControl>
                  <div className="flex flex-1 w-full gap-2">
                    <Input className="flex-1" type="date" {...field} />
                    <p className="h-[40px] flex items-center">
                      {form.watch("data_nascimento")
                        ? getAge(form.watch("data_nascimento") || "")
                        : 0}{" "}
                      anos
                    </p>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
      </section>
      <FormField
        control={form.control}
        name="observacao"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Observação</FormLabel>
            <FormControl>
              <Textarea
                className="rounded-md flex-1 h-[106px] ring-offset-0 border focus-:ring-0 focus:ring-offset-0 "
                placeholder="..."
                {...field}
              />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </>
  );
}
