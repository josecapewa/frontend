type Municipality
 = {
  id: string;
  nome: string;
  id_provincia: string;
  provincia: Province;
}
type MunicipalityToCreate
 = Omit<Municipality, "id" | "provincia">

type MunicipalityToUpdate = Partial<MunicipalityToCreate>
