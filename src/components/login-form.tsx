import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { LoginData, loginSchema } from "@/modules/validations/login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastPromiseConfig } from "./config/toast";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm({
  onSubmit,
  loginButtonText = "Login",
  loadingText = "Fazendo Login",
  successText = "Login efectuado com sucesso",
}: {
  onSubmit: (loginData: LoginData) => Promise<void>;
  loginButtonText?: string;
  loadingText?: string;
  successText?: string;
}) {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identification: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleOnSubmit = async (data: LoginData) => {
    setIsLoading(true);
    toastPromiseConfig({
      fn: onSubmit(data).finally(() => setIsLoading(false)),
      loading: loadingText,
      success: successText,
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className="flex w-full max-w-md flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold mt-[-40px]">Tuassakidila</h1>
          <p className="text-balance text-sm text-zinc-500 dark:text-zinc-400">
            Coloque o seu email ou identificação abaixo para fazer login
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email ou identificação</Label>
            <FormField
              control={form.control}
              name="identification"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input placeholder="00000-000000000LA041" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Palavra-passe</Label>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Esqueceu a palavra-passe?
              </a>
            </div>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormControl>
                    <div className="relative flex items-center h-full">
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="pr-[52px]"
                        placeholder="*****"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute hover:bg-gray-300 rounded-md transition-all text-zinc-500 hover:text-black top-1/2 p-2 -translate-y-1/2 h-max inset-y-0 right-0 flex items-center"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full bg-[#386641]"
          >
            {loginButtonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}
