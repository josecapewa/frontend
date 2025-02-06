import CustomTable from "@/components/custom/table";
import { ValidImageData } from "@/modules/services/api/student-card";
import { CheckCircle2Icon, X } from "lucide-react";

type StudentInClassCardTableProps
 = {
  infoFiles: (Partial<ValidImageData> & { valid: boolean })[];
}
export default function StudentsImagesTable({
  infoFiles,
}: StudentInClassCardTableProps) {
  return (
    <CustomTable
      data={infoFiles}
      headers={["Nome do aluno", "Nº de processo", "Turma", "Sucesso"]}
      columns={[
        {
          data: (student) => student.nome || "N/A",
          align: "left",
        },
        {
          data: (student) => student.n_processo || "N/A",
        },
        {
          data: (student) => student.turma || "N/A",
        },
        {
          data: (student) =>
            student.valid ? (
              <CheckCircle2Icon className="text-green-600" />
            ) : (
              <X className="text-red-500" />
            ),
        },
      ]}
      caption="Imagens válidas"
    />
  );
}
