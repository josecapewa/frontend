import { toastPromiseConfig } from "@/components/config/toast";
import CustomSelector from "@/components/custom/selector";
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { genders } from "@/lib/definitions/genders";
import { getFirstAndLastName, removeAccents } from "@/modules/helpers/names";
import { userSchema } from "@/modules/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
export type CustomUserToUpdate = Partial<z.infer<typeof userSchema>>;

export default function UserEditForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: CustomUserToUpdate) => Promise<void>;
  defaultValues?: User;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const customDefaultValues: CustomUserToUpdate = {
    nome: defaultValues?.pessoa.nome,
    nome_usuario: defaultValues?.nome_usuario,
    genero: defaultValues?.pessoa.genero,
    is_master: defaultValues?.is_master,
    telefone: defaultValues?.pessoa.telefone?.numero.toString(),
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
    }, [] as CustomUserToUpdate["permissoes_telas"]),
  };

  const form = useForm<CustomUserToUpdate>({
    resolver: zodResolver(userSchema),
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

  const handleOnSubmit = async (data: CustomUserToUpdate) => {
    if (!data.is_master && permissions.length === 0) {
      form.setError("permissoes_telas", {
        type: "min",
        message: "É necessário adicionar pelo menos uma tela.",
      });
      return;
    }
    setIsLoading(true);
    toastPromiseConfig({
      fn: onSubmit(data).finally(() => setIsLoading(false)),
      loading: "A Editar usuário...",
      success: "Usuário editado com sucesso.",
    });
  };

  const screensPermissions = form.watch("permissoes_telas");
  const hasTotalAcess = form.watch("is_master");
  const onTotalAcessChange = (value: boolean) => {
    if (value) {
      form.setValue("permissoes_telas", []);
    }
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
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex.: Amarildo Ricardo Vieira"
                  {...field}
                  onChange={(e) => {
                    const fullName = e.target.value;
                    const username = removeAccents(
                      getFirstAndLastName(fullName ?? "")
                        .split(" ")
                        .join("")
                    ).toLowerCase();
                    field.onChange(fullName);
                    form.setValue("nome_usuario", username);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nome_usuario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome de usuário</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: amarildoviera" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="genero"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gênero</FormLabel>
              <FormControl>
                <CustomSelector
                  items={genders}
                  onChange={(value) => field.onChange(value === "M")}
                  value={field.value ? "M" : "F"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telefone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Ex.: 923 321 377" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_master"
          render={({ field }) => (
            <FormItem className="flex flex-col my-3">
              <FormControl>
                <Label className="flex items-center gap-2 2xl:text-base">
                  <Switch
                    checked={field.value}
                    onCheckedChange={(value) => {
                      field.onChange(value);
                      onTotalAcessChange(value);
                    }}
                  />

                  {field.value ? (
                    <Check className="text-ipilOrange" />
                  ) : (
                    "Acesso Total"
                  )}
                </Label>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!hasTotalAcess && (
          <FormField
            control={form.control}
            name="permissoes_telas"
            render={() => (
              <FormItem className="mb-2">
                <FormLabel>Acesso a telas</FormLabel>
                <div className="flex justify-between gap-2 flex-wrap">
                  <p>
                    {permissions.length}{" "}
                    {permissions.length === 1 ? "acesso" : "acessos"}
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
        )}
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
                    <FormLabel className="flex h-[24px] items-center gap-2">
                      Permissões{" "}
                      <Switch
                        checked={
                          screensPermissions?.[index].permissoes.length ===
                          permissionList.filter((permissionValue) =>
                            screensPermissions?.[index].caminho_tela.endsWith(
                              "/painel"
                            )
                              ? permissionValue === "VISUALISAR"
                              : permissionValue
                          ).length
                        }
                        onCheckedChange={(value) => {
                          if (
                            value &&
                            !screensPermissions?.[index].caminho_tela.endsWith(
                              "/painel"
                            )
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
                            screensPermissions?.[index].caminho_tela.endsWith(
                              "/painel"
                            )
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

        <Button disabled={isLoading} className="w-full mt-5" type="submit">
          Editar
        </Button>
      </form>
    </Form>
  );
}
