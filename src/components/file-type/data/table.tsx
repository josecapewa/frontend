import CustomTable from "@/components/custom/table";

export default function FileTypesTable({
  fileTypes,
  onDelete,
  onEdit,
}: {
  fileTypes?: FileType[];
  onEdit?: (documentType: FileType) => void;
  onDelete?: (id: string) => void;
}) {
  return (
    <CustomTable
      data={fileTypes}
      headers={["Nome"]}
      columns={[
        {
          data: "nome",
          align: "left",
        },
      ]}
      getId={(documentType) => documentType.id}
      onDelete={onDelete}
      onEdit={onEdit}
      emptyMessage="Sem tipos de documentos cadastrados"
    />
  );
}
