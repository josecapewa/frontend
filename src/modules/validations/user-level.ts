import { z } from "zod";
import { nonEmptyString } from "."

export const permissionSchema = z.object({
  permissoes: z.array(
    z.enum(["CRIAR", "VISUALISAR", "EDITAR", "ELIMINAR"], {
      required_error: "Introduza a permissão",
    })
  ),
  caminho_tela: nonEmptyString("Seleccione uma tela"),
});

export const userLevelSchema = z.object({
  nome: z.string({ required_error: "Introduza o nome" }),
  descricao: z.string().optional(),
  permissoes_telas: z.array(permissionSchema).min(1, {
    message: "Introduza pelo menos uma permissão",
  }),
});
