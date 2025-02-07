import { z } from "zod";

export const categoryValidations = z.object({
    nome: z.string({ required_error: "Introduza o nome" }),
    descricao: z.string().optional(),
});