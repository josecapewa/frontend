import { useForm } from "react-hook-form";
import { IdentificationFields } from "./identification-fields";
import {
  PersonalInfoData,
  personalInfoSchema,
} from "@/modules/validations/person";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { PersonalFields } from "./personal-fields";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, SaveIcon } from "lucide-react";
import { LocationFields } from "./location-fields";
import { ComplementarFields } from "./complementar-fields";
import { StudentMultiStepFormData } from "@/modules/validations/student-multi-step-form";

type PersonalInfoFormProps
 = {
  onSubmit: (data: PersonalInfoData) => void;
  formData: StudentMultiStepFormData;
  useBackButton?: {
    onClick: () => void;
  };
}
export function PersonalInfoForm({
  onSubmit,
  formData,
  useBackButton,
}: PersonalInfoFormProps) {
  const form = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: { ...formData },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex justify-center gap-3 max-xl:block"
      >
        <aside className="flex-wrap flex-1 max-xl:mx-auto max-xl:pl-1">
          <IdentificationFields form={form} />
          <PersonalFields form={form} />
        </aside>
        <aside className="flex flex-wrap flex-1 h-full max-xl:mx-auto max-xl:pl-1">
          <LocationFields form={form} />
          <ComplementarFields form={form} />
          
          <section className="mt-3 flex w-full gap-3 justify-between">
            {useBackButton && (
              <Button
                className="flex items-center gap-2"
                onClick={useBackButton.onClick}
              >
                <ArrowLeft size={18} />
                Voltar
              </Button>
            )}
            <div className="flex w-full gap-2  justify-end">
              <Button className="flex items-center gap-2">
                Guardar
                <SaveIcon size={18} />
              </Button>
              <Button className="flex items-center gap-2">
                Avançar
                <ArrowRight size={18} />
              </Button>
            </div>
          </section>
        </aside>
      </form>
    </Form>
  );
}
