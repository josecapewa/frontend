import CustomTable from "@/components/custom/table";
import CustomToolTip from "@/components/custom/tooltip";
import ProfilePicture from "@/components/profile/picture";
import StudentPhotoContextMenu from "@/components/student/photo-context-menu";
import { Switch } from "@/components/ui/switch";
import { booleanGendersNames } from "@/lib/definitions/genders";
import { cn } from "@/lib/utils";
import { MdFemale, MdMale } from "react-icons/md";

type StudentInClassCardTableProps = {
  studentsInClassCards?: StudentInClassCard[];
  onEdit?: (student: StudentInClassCard) => void;
  onDelete?: (id: string) => void;
  onImageClick?: (student: StudentInClassCard, imageUrl?: string) => void;
  onRowClick?: (student: StudentInClassCard) => void;
  onSelectionChange?: (student: StudentInClassCard) => void;
  selectedStudents?: string[];
  useClassColumn?: boolean;
  onPassPhotoDelete?: (id_aluno: string) => void;
  onOriginalPhotoDelete?: (id_aluno: string) => void;
};
export default function StudentsCardsTable({
  studentsInClassCards,
  onDelete,
  onEdit,
  onImageClick,
  onRowClick,
  onSelectionChange,
  selectedStudents,
  useClassColumn,
  onOriginalPhotoDelete,
  onPassPhotoDelete,
}: StudentInClassCardTableProps) {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    img.src = "/student-not-found.svg";
  };

  const headers = [
    "Foto",
    "Nº",
    "Nº de processo",
    "Nome",
    "Gênero",
    "Vias",
    ...(useClassColumn ? ["Turma"] : []),
  ];

  return (
    <CustomTable
      onRowClick={onRowClick}
      useNumbering={false}
      data={studentsInClassCards}
      headers={headers}
      addOperation={(student) => (
        <Switch
          className="h-5 w-10"
          thumbClassName="size-4"
          onCheckedChange={() =>
            onSelectionChange && onSelectionChange(student)
          }
          checked={selectedStudents?.includes(student.id)}
        />
      )}
      columns={[
        {
          data: (studentInClassCard) => {
            const actualImage = studentInClassCard.aluno.pessoa.foto
              ? `${import.meta.env.VITE_IMAGES_DIR}/${
                  studentInClassCard.aluno.pessoa.foto
                }`
              : undefined;

            const originalImage = studentInClassCard.aluno.foto_original
              ? `${import.meta.env.VITE_IMAGES_DIR}/${
                  studentInClassCard.aluno.foto_original
                }`
              : undefined;

            const studentImage = actualImage || originalImage || "empty";

            return (
              <div className="relative size-max">
                <CustomToolTip
                  text={`Clique para editar a imagem do aluno(a) ${studentInClassCard.aluno.pessoa.nome}`}
                >
                  <StudentPhotoContextMenu
                    onEdit={() =>
                      onImageClick?.(studentInClassCard, originalImage)
                    }
                    onPassPhotoDelete={
                      actualImage
                        ? () => onPassPhotoDelete?.(studentInClassCard.aluno.id)
                        : undefined
                    }
                    onOriginalPhotoDelete={
                      originalImage
                        ? () =>
                            onOriginalPhotoDelete?.(studentInClassCard.aluno.id)
                        : undefined
                    }
                  >
                    <ProfilePicture
                      onClick={() =>
                        onImageClick &&
                        onImageClick(studentInClassCard, originalImage)
                      }
                      onError={handleImageError}
                      className={cn(
                        "size-11 aspect-square border border-ipilOrange object-center rounded-none  hover:cursor-pointer ",
                        {
                          "rounded-full": actualImage,
                          "border rounded-none": !actualImage,
                          "border-none": !actualImage && !originalImage,
                        }
                      )}
                      name={studentInClassCard.aluno.pessoa.nome}
                      imageUrl={studentImage}
                    />
                  </StudentPhotoContextMenu>
                </CustomToolTip>
                {originalImage && actualImage && (
                  <div className="size-2 absolute top-0 right-0 rounded-full bg-ipilOrange" />
                )}
              </div>
            );
          },
        },
        {
          data: (student) => student.n_turma || "-",
        },
        {
          data: (student) => student.aluno.n_processo,
        },

        {
          data: (student) => student.aluno.pessoa.nome,
          align: "left",
        },

        {
          data: (student) => {
            return (
              <div className="flex gap-2 items-center justify-center w-max">
                {student.aluno.pessoa.genero ? <MdMale /> : <MdFemale />}
                {
                  booleanGendersNames[
                    String(
                      student.aluno.pessoa.genero
                    ) as keyof typeof booleanGendersNames
                  ]
                }
              </div>
            );
          },
        },
        {
          data: (student) => student.emissoes_cartao.length,
        },
        ...(useClassColumn
          ? [
              {
                data: (student: StudentInClassCard) =>
                  student.turma?.nome_turma.designacao,
              },
            ]
          : []),
      ]}
      getId={(student) => student.aluno.pessoa.id}
      onEdit={onEdit}
      onDelete={onDelete}
      emptyMessage="Sem Alunos cadastrados"
      caption="Alunos"
    />
  );
}
