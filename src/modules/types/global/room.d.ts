type Room
 = {
  id: string;
  designacao: string;
  id_sector: string;
  sector: Omit<Sector, "salas">;
}
type RoomToCreate= Omit<Room, "id" | "sector">
type RoomToUpdate = Partial<RoomToCreate>
