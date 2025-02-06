import { z } from "zod";

export const nonEmptyString = (message: string) =>
  z.string({ required_error: message }).trim().min(1, { message });
export const angolanPhoneSchema = z.string().regex(/^9[123456789]\d{7}$/, {
  message:
    "O número de telefone deve ser válido e começar com 9 seguido de 8 dígitos.",
});
