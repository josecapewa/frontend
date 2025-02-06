import { toastPromiseConfig } from "@/components/config/toast";
import CustomToolTip from "@/components/custom/tooltip";
import { permissionList } from "@/components/permission/selector";
import SystemScreensSelector from "@/components/system-screens/selector";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { userLevelSchema } from "@/modules/validations/user-level";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
export type CustomUserLevelToUpdate = Partial<z.infer<typeof userLevelSchema>>;

export default function UserLevelEditForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: CustomUserLevelToUpdate) => Promise<void>;
  defaultValues?: UserLevel;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const customDefaultValues: CustomUserLevelToUpdate = {
    nome: defaultValues?.nome,
    descricao: defaultValues?.descricao ?? undefined,
    permissoes_telas: defaultValues?.permissoes_telas.reduce((acc, pt) => {
      const existingPermission = acc?.find(
        (item) => item.caminho_tela === pt.caminho_tela
      );

      if (existingPermission) {
        existingPermission.permissoes.push(pt.permissao);
      } else {
        acc?.push({
          caminho_tela: pt.caminho_tela,
          permissoes: [pt.permissao],
        });
      }

      return acc;
    }, [] as CustomUserLevelToUpdate["permissoes_telas"]),
  };

  const form = useForm<CustomUserLevelToUpdate>({
    resolver: zodResolver(userLevelSchema.partial()),
    defaultValues: customDefaultValues,
  });

  const {
    append: addPermission,
    remove: removePermission,
    fields: permissions,
  } = useFieldArray({
    control: form.control,
    name: "permissoes_telas",
  });

  const handleOnSubmit = async (data: CustomUserLevelToUpdate) => {
    setIsLoading(true);
    toastPromiseConfig({
      fn: onSubmit(data).finally(() => setIsLoading(false)),
      loading: "A Editar nível de usuário...",
      success: "Nível de usuário editado com sucesso.",
    });
  };

  const screensPermissions = form.watch("permissoes_telas");

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
              <FormLabel>Nome do nível</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: Administrador" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="permissoes_telas"
          render={() => (
            <FormItem className="mb-2">
              <FormLabel>Acesso a telas</FormLabel>
              <div className="flex justify-between gap-2 flex-wrap">
                <p>
                  {permissions.length}{" "}
                  {permissions.length === 1 ? "tela" : "telas"}
                </p>
                <Button
                  className="flex gap-2"
                  onClick={() =>
                    addPermission({
                      caminho_tela: "",
                      permissoes: [],
                    })
                  }
                  type="button"
                >
                  Adicionar <PlusCircle />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {permissions.map((permission, index) => (
          <div
            key={permission.id}
            className="border p-4 mb-4 relative rounded-lg"
          >
            <CustomToolTip side="left" text="Remover tela">
              <Button
                variant="ghost"
                className="flex size-8 p-1 gap-2 absolute top-0 right-0"
                onClick={() => removePermission(index)}
                type="button"
              >
                <X />
              </Button>
            </CustomToolTip>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name={`permissoes_telas.${index}.caminho_tela`}
                render={({ field }) => (
                  <FormItem className="max-w-xs w-full">
                    <FormLabel>Tela</FormLabel>
                    <FormControl>
                      <SystemScreensSelector
                        {...field}
                        onChange={(value) => {
                          field.onChange(value);
                          form.setValue(
                            `permissoes_telas.${index}.permissoes`,
                            ["VISUALISAR"]
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`permissoes_telas.${index}.permissoes`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="flex items-center gap-2 mb-3">
                      Permissões{" "}
                      <Switch
                        checked={
                          (screensPermissions?.[index]?.permissoes.length ??
                            0) ===
                          permissionList.filter((permissionValue) =>
                            (
                              screensPermissions?.[index]?.caminho_tela ?? ""
                            ).endsWith("/painel")
                              ? permissionValue === "VISUALISAR"
                              : permissionValue
                          ).length
                        }
                        onCheckedChange={(value) => {
                          if (
                            value &&
                            !(
                              screensPermissions?.[index]?.caminho_tela ?? ""
                            ).endsWith("/painel")
                          ) {
                            form.setValue(
                              `permissoes_telas.${index}.permissoes`,
                              permissionList
                            );
                          } else {
                            form.setValue(
                              `permissoes_telas.${index}.permissoes`,
                              ["VISUALISAR"]
                            );
                          }
                        }}
                        className="w-8 h-4"
                        thumbClassName="size-3 data-[state=checked]:translate-x-4"
                      />
                    </FormLabel>
                    <FormControl>
                      <ToggleGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        value={field.value}
                        type="multiple"
                        variant="outline"
                        className="flex flex-wrap justify-start"
                      >
                        {permissionList
                          .filter((permissionValue) =>
                            (
                              screensPermissions?.[index]?.caminho_tela ?? ""
                            ).endsWith("/painel")
                              ? permissionValue === "VISUALISAR"
                              : permissionValue
                          )
                          .map((permissionValue) => (
                            <ToggleGroupItem
                              aria-label={`Seleccionar ${permissionValue}`}
                              value={permissionValue}
                              className="w-full max-w-[90px]"
                            >
                              {permissionValue}
                            </ToggleGroupItem>
                          ))}
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ex.: Administrador do sistema"
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
