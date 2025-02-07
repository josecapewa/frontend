import { z } from "zod";

export const benefitValidations = z.object({
  nome: z.string({ required_error: "Introduza o nome do benef+icio" }),
  descricao: z.string({ required_error: "Introduza a descrição do benefício" }),
  pontos: z
    .number()
    .int()
    .positive("A quantidade de pontos necessários deve ser um número positivo"),
  id_categoria: z.string({
    required_error: "Selecione a categoria do benefício",
  }),
});

export const obtainBenefitValidations = z
  .object({
    telefone: z.string().optional().or(z.literal("")),
    email: z.string().optional().or(z.literal("")),
    id_usuario: z.string(),
  })
  .refine((data) => data.telefone?.trim() !== "" || data.email?.trim() !== "", {
    message: "Introduza pelo menos um meio de contato (telefone ou e-mail)",
    path: ["telefone"], // Aplica o erro apenas no campo telefone
  });
