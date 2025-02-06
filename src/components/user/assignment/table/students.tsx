import CustomTable from "@/components/custom/table";
import { booleanGendersNames } from "@/lib/definitions/genders";
import { cn } from "@/lib/utils";
import { MdFemale, MdMale } from "react-icons/md";
import ProfilePicture from "@/components/profile/picture";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";

type StudentTableProps = {
  students?: Student[];
  useClassColumn?: boolean;
  onAddUser?: (personalData: Person) => void;
};
export default function StudentsAssignmentTable({
  students,
  useClassColumn,
  onAddUser,
}: StudentTableProps) {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    img.src = "/student-not-found.svg";
  };
  const headers = [
    ...["Foto", "Nº", "Nº de processo", "Nome", "Gênero"],
    ...(useClassColumn ? ["Turma"] : []),
    "Usuário",
  ];
  return (
    <CustomTable
      useNumbering={false}
      data={students}
      headers={headers}
      columns={[
        {
          className: "p-1",
          data: (student) => {
            const actualImage = student.pessoa.foto
              ? `${import.meta.env.VITE_IMAGES_DIR}/${student.pessoa.foto}`
              : undefined;

            const originalImage = student.foto_original
              ? `${import.meta.env.VITE_IMAGES_DIR}/${student.foto_original}`
              : undefined;
            const studentImage = actualImage || originalImage || "empty";

            return (
              <ProfilePicture
                onError={handleImageError}
                className={cn(
                  "size-11 aspect-square object-cover rounded-none  hover:cursor-pointer ",
                  {
                    "rounded-full border border-ipilOrange": actualImage,
                    "border-none rounded-none": !actualImage,
                  }
                )}
                name={student.pessoa.nome}
                imageUrl={studentImage + `?${new Date().getTime()}`}
              />
            );
          },
        },
        {
          data: (student) => student.aluno_turma.n_turma || "-",
        },
        {
          data: (student) => student.n_processo,
        },

        {
          data: (student) => student.pessoa.nome,
          align: "left",
        },

        {
          data: (student) => {
            return (
              <div className="flex gap-2 items-center justify-center w-max">
                {student.pessoa.genero ? <MdMale /> : <MdFemale />}
                {
                  booleanGendersNames[
                    String(
                      student.pessoa.genero
                    ) as keyof typeof booleanGendersNames
                  ]
                }
              </div>
            );
          },
        },
        ...(useClassColumn
          ? [
              {
                data: (student: Student) =>
                  student.aluno_turma.turma.nome_turma.designacao,
              },
            ]
          : []),
        {
          data: (student: Student) =>
            student.pessoa.usuario ? (
              <FaUserCheck size={26} className="text-ipilOrange" />
            ) : (
              <FaUserPlus
                onClick={() => onAddUser?.(student.pessoa)}
                size={26}
                className="transition-all hover:text-ipilOrange cursor-pointer"
              />
            ),
        },
      ]}
      getId={(student) => student.pessoa.id}
      emptyMessage="Sem Alunos cadastrados"
      caption="Alunos"
    />
  );
}
