import { z } from "zod";

export const loginSchema = z.object({
  identification: z
    .string()
    .min(4, "O nome de usuário deve ter no mínimo 4 carácteres")
    .refine((value) => value.trim() !== "", {
      message: "Digite o nome de usuário",
    }),
  password: z
    .string()
    .min(8, "A password deve ter no mínimo 8 carácters")
    .refine((value) => value.trim() !== "", {
      message: "Digite a password",
    }),
});

export type LoginData = z.infer<typeof loginSchema>;
