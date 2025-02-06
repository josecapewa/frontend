type IdentificationType
 = {
  id: string;
  nome: string;
}
 type IdentificationTypeToCreate= Omit<IdentificationType, "id">
type IdentificationTypeToUpdate
  = Partial<IdentificationTypeToCreate>
