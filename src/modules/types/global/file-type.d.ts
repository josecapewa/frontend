type FileType
 = {
  id: string;
  nome: string;
}
type FileTypeToCreate= Omit<FileType, "id">

type FileTypeToUpdate = Partial<FileType>
