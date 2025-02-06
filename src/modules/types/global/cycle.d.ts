type Cycle
 = {
  id: string;
  nome:string
}
type CycleToCreate= Omit<Cycle, "id">

type CycleToUpdate = Partial<Cycle>