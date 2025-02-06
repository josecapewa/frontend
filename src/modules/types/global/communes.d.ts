type Commune
 = {
  id: string;
  nome: string;
  id_municipio: string;
  municipio?: Omit<Municipality, "provincia">;
}
type CommuneToCreate= Omit<Commune, "id" | "municipio">

type CommuneToUpdate = Partial<CommuneToCreate>
