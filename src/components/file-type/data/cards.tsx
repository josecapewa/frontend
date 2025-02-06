import CustomViewCards from "@/components/custom/view-cards";

export default function FileTypesCards({
  fileTypes,
  onDelete,
  onEdit,
}: {
  fileTypes?: FileType[];
  onEdit?: (room: FileType) => void;
  onDelete?: (id: string) => void;
}) {
  return (
    <CustomViewCards
      data={fileTypes}
      emptyMessage="Sem tipos de ficheiros cadastrados"
      getPrimaryProperty={(documentType) => documentType.nome}
      onDelete={onDelete}
      onEdit={onEdit}
      getId={(documentType) => documentType.id}
    />
  );
}
