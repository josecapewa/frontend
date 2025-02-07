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
import { useSessionStore } from "@/modules/services/stores/session";
import {
  benefitValidations,
  obtainBenefitValidations,
} from "@/modules/validations/benefit";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export type ObtainBenefit = {
  telefone?: string;
  email?: string;
  id_usuario: string;
};
export default function ObtainBenefitForm({
  onSubmit,
  isAvailable,
}: {
  onSubmit: (data: ObtainBenefit) => Promise<void>;
  isAvailable: boolean;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const user = useSessionStore((state) => state.user);

  const form = useForm<ObtainBenefit>({
      resolver: zodResolver(obtainBenefitValidations),
        defaultValues: {
            id_usuario: user?.id!,
        },
  });

  const handleOnSubmit = async (data: ObtainBenefit) => {
      setIsLoading(true);
    toastPromiseConfig({
      fn: onSubmit(data).finally(() => setIsLoading(false)),
      loading: "A obter benefício...",
      success:
        "Benefício obtido com sucesso. Verifique o seu e-mail ou telefone.",
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
          name="telefone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de telefone</FormLabel>
              <FormControl>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-2.5 text-gray-400"
                    size={18}
                  />
                  <Input
                    className="pl-10"
                    placeholder="Ex.: 50"
                    min={0}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-2.5 text-gray-400"
                    size={18}
                  />
                  <Input
                    className="pl-10"
                    placeholder="Ex.: email@exemplo.com"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="id_usuario"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormLabel>Usuário</FormLabel>
              <FormControl>
                <Input {...field} value={user?.id!} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isLoading || !isAvailable}
          className={`w-full mt-5 flex items-center justify-center gap-2 transition ${
            isAvailable
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Obter
        </Button>
      </form>
    </Form>
  );
}
