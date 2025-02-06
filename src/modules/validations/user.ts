import { z } from "zod";
import { permissionSchema } from "./user-level";
import { angolanPhoneSchema, nonEmptyString } from ".";

export const userSchema = z.object({
  nome_usuario: nonEmptyString("Introduza o nome de usuário"),
  nome: nonEmptyString("Introduza o nome"),
  genero: z.coerce.boolean({ required_error: "Seleccione o gênero" }),
  is_master: z.coerce.boolean(),
  telefone: angolanPhoneSchema,
  email: z.string().email("Introduza um email válido").optional(),
  permissoes_telas: z.array(permissionSchema).optional(),
});

export const assignUserSchema = z.object({
  telefone: angolanPhoneSchema,
});
