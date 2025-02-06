import AlertDeleteDialog from "@/components/custom/alert-delete";
import {
  toastErrorConfig,
  toastPromiseConfig,
} from "@/components/config/toast";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Label } from "@/components/ui/label";
import { studentService } from "@/modules/services/api/student";
import { Button } from "@/components/ui/button";
import FormDialog from "@/components/custom/form-dialog";
import { CustomPagination } from "@/components/custom/pagination";
import PageQuantitySelector from "@/components/page-quantity-selector";
import ProfilePicture from "@/components/profile/picture";
import TeachersTable from "@/components/teacher/data/table";
import { teacherService } from "@/modules/services/api/teacher";
import TeacherSimpleAddForm from "@/components/teacher/forms/simple-add";
import { disciplinesService } from "@/modules/services/api/discipline";
import TeacherPreviewDataForm from "@/components/teacher/forms/preview-data";
import TeacherSimpleEditForm from "@/components/teacher/forms/simple-edit";
import TeacherImageCropDialog from "@/components/teacher/dialog/image-crop";
import { categoryService } from "@/modules/services/api/category";
import { laborRegimeService } from "@/modules/services/api/labor-regime";
import { base64ToFile } from "@/modules/helpers/files/base64-to-file";
import { TeacherSimpleData } from "@/modules/validations/teacher";
import { literaryQualificationService } from "@/modules/services/api/literaly-qualifications";
import { handleOnSearch } from "@/modules/helpers/search-params";
import { useDebounce } from "@/modules/hooks/use-debounce";
import SearchInput from "@/components/custom/search-input";
import dayjs from "dayjs";

export default function TeacherSearchPage() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const filter = searchParams.get("filtro") || undefined;
  const limit = Number(searchParams.get("limit") || 60);
  const page = Number(searchParams.get("page") || 1);
  const [teacherImage, setTeacherImage] = useState<string>();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [teacherToEdit, setTeacherToEdit] = useState<Teacher>();
  const [studentIdToDelete, setStudentIdToDelete] = useState<string>();
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [viewDataTeacher, setViewDataTeacher] = useState<Teacher>();

  const [filterText, setFilterText] = useState(filter);

  const {
    data: teachersData,
    error,
    refetch: refetch,
  } = useQuery({
    queryKey: ["teachers", filter, limit, page],
    queryFn: () =>
      teacherService.getAll({
        filter,
        limit,
        page,
      }),
  });

  const { data: disciplinesData, error: disciplinesError } = useQuery({
    queryKey: ["classes"],
    queryFn: () => disciplinesService.getAll(),
  });

  const { data: categoriesData, error: categoriesError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getAll(),
  });

  const { data: laborRegimesData, error: laborRegimesError } = useQuery({
    queryKey: ["laborRegimes"],
    queryFn: () => laborRegimeService.getAll(),
  });

  const {
    data: literaryQualificationsData,
    error: literaryQualificationsError,
  } = useQuery({
    queryKey: ["literaryQualifications"],
    queryFn: () => literaryQualificationService.getAll(),
  });

  if (laborRegimesError)
    toastErrorConfig("Erro ao carregar os regimes laborais", laborRegimesError);

  if (literaryQualificationsError)
    toastErrorConfig(
      "Erro ao carregar as habilitações literárias",
      literaryQualificationsError
    );

  if (categoriesError)
    toastErrorConfig("Erro ao carregar as categorias", categoriesError);

  if (disciplinesError)
    toastErrorConfig("Erro ao carregar as disciplinas", disciplinesError);

  if (error) toastErrorConfig("Erro ao carregar os alunos", error);

  const [selectedTeacher, setSelectedTeacher] = useState(teachersData?.data[0]);

  const handleDelete = async () => {
    await studentService.deletePerson(studentIdToDelete!);
    refreshTeacherList();
    setIsAlertDialogOpen(false);
  };

  const handleOnDelte = (id: string) => {
    setStudentIdToDelete(id);
    setIsAlertDialogOpen(true);
  };

  const onSearch = useDebounce(
    (text: string) =>
      handleOnSearch({
        text,
        searchParamsHelpers: { searchParams, navigate },
      }),
    500
  );

  const refreshTeacherList = useCallback(() => {
    toastPromiseConfig({
      fn: refetch(),
      loading: "A actualizar a lista de professores",
      success: "Lista de professores actualizada com sucesso",
    });
  }, [refetch]);

  const hanldeOnTeacherImageClick = useCallback(
    (teacher: Teacher, imageSrc?: string) => {
      setTeacherToEdit(teacher);
      setTeacherImage(imageSrc);
      setIsCropDialogOpen(true);
    },
    [setTeacherToEdit, setTeacherImage, setIsCropDialogOpen]
  );
  const handleOnRowClick = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleConfirm = useCallback(
    async (base64ResultImg: string, base64OriginalImg?: string) => {
      try {
        const newImage = base64ToFile(base64ResultImg, "teacher-image.jpg");
        const originalImage = base64OriginalImg
          ? base64ToFile(base64OriginalImg, "teacher-original-image.jpg")
          : undefined;

        toastPromiseConfig({
          fn: Promise.all([
            teacherService
              .updateImage(teacherToEdit!.id, {
                image: newImage,
                n_agente: teacherToEdit!.n_agente,
              })
              .then(async () => {
                refreshTeacherList();
                setIsCropDialogOpen(false);
              }),
            originalImage
              ? teacherService.updateOriginalImage(teacherToEdit!.id, {
                  image: originalImage,
                  n_agente: teacherToEdit!.n_agente,
                })
              : Promise.resolve(),
          ]),

          loading: "A actualizar a imagem do aluno",
          success: "Imagem do aluno actualizada com sucesso",
        });
      } catch (error) {
        console.error("Erro ao recortar e baixar a imagem:", error);
      }
    },
    [teacherToEdit, refreshTeacherList]
  );

  const handleOnEdit = (teacher: Teacher) => {
    console.log("Professor a ser editado", teacher);
    setTeacherToEdit(teacher);
    setEditDialogOpen(true);
  };

  const handleSimpleAddDialogSubmit = async (data: TeacherSimpleData) => {
    await teacherService.simpleCreate(data);
    refetch();
  };
  const handleSimpleEditDialogSubmit = async (
    data: Partial<TeacherSimpleData>
  ) => {
    console.log("Data a ser editada", data);
    await teacherService.simpleUpdate(teacherToEdit!.id!, data);
    refreshTeacherList();
  };

  console.log("Professores", teachersData?.data);

  return (
    <section className="py-4">
      <h2 className="mt-4 py-2 border-b font-bold text-lg">Filtros</h2>
      <section className="flex gap-3 items-end mt-4">
        <SearchInput
          value={filterText}
          onChange={(e) => {
            setFilterText(e.target.value);
            onSearch(e.target.value);
          }}
        />
      </section>
      <section className="border-ipilOrange mt-4 border-[.5px] flex justify-between items-center w-full p-4 rounded-md">
        <div className="flex flex-col gap-2">
          <p>
            Nome:{" "}
            <span className="font-semibold">
              {selectedTeacher?.pessoa.nome || "-"}
            </span>
          </p>
          <p>
            Habilitações literárias/Profissionais:{" "}
            <span className="font-semibold">
              {selectedTeacher?.habilitacao_literaria?.nome || "-"}
            </span>
          </p>
          <p>
            Categoria:{" "}
            <span className="font-semibold">
              {selectedTeacher?.categoria?.categoria || "-"}
            </span>
          </p>
          <p>
            Regime Laboral:{" "}
            <span className="font-semibold">
              {selectedTeacher?.regime_laboral?.regime || "-"}
            </span>
          </p>
          <p>
            Tempo de serviço no IPIL:{" "}
            <span className="font-semibold">
              {selectedTeacher?.data_inicio_ipil
                ? `${dayjs(selectedTeacher.data_inicio_ipil).diff(
                    dayjs(),
                    "years"
                  )} anos`
                : "-"}
            </span>
          </p>
          <p>
            Temppo de serviço na educação:{" "}
            <span className="font-semibold">
              {selectedTeacher?.data_inicio_educacao
                ? `${dayjs(selectedTeacher.data_inicio_educacao).diff(
                    dayjs(),
                    "years"
                  )} anos`
                : "-"}
            </span>
          </p>
          <p className="text-wrap">
            Disciplinas:{" "}
            <span className="font-semibold">
              {selectedTeacher?.professor_disciplinas
                .map((disc) => disc.disciplina.nome)
                .join(" | ") || "-"}
            </span>
          </p>
          <p>
            Nº de programas:{" "}
            <span className="font-semibold">
              {selectedTeacher?.professor_disciplinas.length || "-"}
            </span>
          </p>
          <p>
            Turmas: <span className="font-semibold">-</span>
          </p>
          <p>
            Cargo pedagógico:{" "}
            <span className="font-semibold">
              {selectedTeacher
                ? selectedTeacher.director_de_turmas.length > 0
                  ? `Director de turma (${selectedTeacher?.director_de_turmas
                      .map((dt) => dt.turma.nome_turma.designacao)
                      .join(", ")})`
                  : "Professor"
                : "-"}
            </span>
          </p>
        </div>
        <div className="flex items-end justify-center max-md:flex-1">
          <ProfilePicture
            imageUrl={selectedTeacher?.pessoa.foto ?? undefined}
            name={selectedTeacher?.pessoa.nome}
          />
        </div>
      </section>

      <section className="flex justify-between items-end my-4">
        <div className="flex flex-col my-3 gap-2">
          <div>
            <Button onClick={() => setAddDialogOpen(true)}>
              Adicionar professor
            </Button>
          </div>
          <p className="text-nowrap">
            Nº de professores:{" "}
            <span className="font-bold">{teachersData?.data.length || 0}</span>
          </p>
        </div>
        <Label className="flex gap-2 items-center">
          Por página
          <PageQuantitySelector
            navigateFunction={navigate}
            searchParams={searchParams}
            value={limit}
            quantity={20}
          />
        </Label>
      </section>
      <div className="flex justify-end mb-4">
        <CustomPagination
          currentPage={page}
          totalPages={teachersData?.info.totalPages}
        />
      </div>
      <TeachersTable
        onDelete={handleOnDelte}
        teachers={teachersData?.data}
        onEdit={handleOnEdit}
        onSeeDataTeacher={(teacher: Teacher) => {
          setIsViewDialogOpen(true);
          setViewDataTeacher(teacher);
        }}
        onRowClick={handleOnRowClick}
        onImageClick={hanldeOnTeacherImageClick}
      />

      <div className="flex justify-end">
        <CustomPagination
          currentPage={page}
          totalPages={teachersData?.info.totalPages}
        />
      </div>

      <AlertDeleteDialog
        subject="Professor"
        message="Ao eliminar este professor, afirma saber das consequências."
        isOpen={isAlertDialogOpen}
        onCancelClick={() => setIsAlertDialogOpen(false)}
        onConfirm={handleDelete}
      />

      <FormDialog
        onDialogCloseClick={() => setAddDialogOpen(false)}
        form={TeacherSimpleAddForm}
        subject="Adicionar professor - simples"
        isOpen={addDialogOpen}
        otherData={{ disciplines: disciplinesData?.data }}
        description="Adicione um professor e clique em 'Concluir' para finalizar a operação"
        onSubmit={handleSimpleAddDialogSubmit}
      />
      <FormDialog
        onDialogCloseClick={() => setIsViewDialogOpen(false)}
        form={(props) => (
          <TeacherPreviewDataForm
            {...props}
            teacherData={viewDataTeacher}
            otherData={viewDataTeacher}
          />
        )}
        subject="Pré - Vizualização"
        isOpen={isViewDialogOpen}
        description="Visualização dos dados completos do professor"
        onSubmit={async () => {
          return Promise.resolve();
        }}
      />

      <FormDialog
        onDialogCloseClick={() => setEditDialogOpen(false)}
        form={TeacherSimpleEditForm}
        subject="Editar professor - simples"
        isOpen={editDialogOpen}
        description="Edite os dados do professor e clique em 'Concluir' para finalizar a operação"
        onSubmit={handleSimpleEditDialogSubmit}
        data={{
          nome: teacherToEdit?.pessoa.nome,
          n_agente: teacherToEdit?.n_agente,
          genero: teacherToEdit?.pessoa.genero,
          id_cargo_pedagogico: teacherToEdit?.cargo_pedagogico?.id,
          id_categoria: teacherToEdit?.categoria?.id,
          id_habilitacao_literaria: teacherToEdit?.habilitacao_literaria?.id,
          data_inicio_educacao: dayjs(
            teacherToEdit?.data_inicio_educacao
          ).format("YYYY-MM-DD"),
          data_inicio_ipil: dayjs(teacherToEdit?.data_inicio_ipil).format(
            "YYYY-MM-DD"
          ),
          id_regime_laboral: teacherToEdit?.regime_laboral?.id,
          disciplinas: teacherToEdit?.professor_disciplinas.map((disc) => ({
            id: disc.disciplina.id,
          })),
        }}
        otherData={{
          categories: categoriesData?.data,
          laborRegimes: laborRegimesData?.data,
          LiteraryQualifications: literaryQualificationsData?.data,
          disciplines: disciplinesData?.data,
        }}
      />
      <TeacherImageCropDialog
        onConfirm={handleConfirm}
        onDialogCloseClick={() => {
          setTeacherImage(undefined);
          setIsCropDialogOpen(false);
        }}
        isOpen={isCropDialogOpen}
        imageSrc={teacherImage}
        teacherName={`${teacherToEdit?.pessoa.nome} - ${teacherToEdit?.n_agente}`}
      />
    </section>
  );
}
