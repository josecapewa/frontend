import { PersonalInfoData } from "@/modules/validations/person";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import ProvincesSelector from "../provinces/selector";
import MunicipalitieSelector from "../municipalities/selector";
import CommuneSelector from "../commune/selector";

type LocationFieldsOtherData = {
  provinces?: Province[];
  municipalities?: Municipality[];
  comunes?: Commune[];
};
export function LocationFields({
  form,
  otherData,
}: {
  form: UseFormReturn<PersonalInfoData>;
  otherData?: LocationFieldsOtherData;
}) {
  return (
    <>
      <section className="flex w-full gap-2">
        <FormField
          control={form.control}
          name="id_provincia"
          render={({ field }) => (
            <FormItem className="flex-1 relative">
              <FormLabel>Província</FormLabel>
              <FormControl>
                <ProvincesSelector
                  provinces={otherData?.provinces}
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
          name="id_municipio"
          render={({ field }) => (
            <FormItem className="flex-1 relative">
              <FormLabel>Município</FormLabel>
              <FormControl>
                <MunicipalitieSelector
                  municipalities={otherData?.municipalities}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id_comuna"
          render={({ field }) => (
            <FormItem className="flex-1 relative">
              <FormLabel>Comuna</FormLabel>
              <FormControl>
                <CommuneSelector communes={otherData?.comunes} {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </section>
    </>
  );
}
