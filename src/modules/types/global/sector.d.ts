type Sector
 = {
  id: string;
  nome: string;
  abreviacao: string;
  salas: Room[];
}
type SectorToCreate = Omit<Sector, "id" | "salas"> 

type SectorToUpdate = Partial<SectorToCreate> 
