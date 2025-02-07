import { boolean } from "zod";

type Reference = {
    id: string;
    codigo: string;
    usado: boolean;
    data: string;
    id_beneficio: string;
}
