import AlertDeleteDialog from "@/components/custom/alert-delete";
import {
  toastErrorConfig,
  toastPromiseConfig,
} from "@/components/config/toast";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  handleOnSearch,
  handleParamChange,
} from "@/modules/helpers/search-params";
import SearchInput from "@/components/custom/search-input";
import { useDebounce } from "@/modules/hooks/use-debounce";
import { useNavigate, useSearchParams } from "react-router";
import StudentsTable from "@/components/student/data/table";
import { Label } from "@/components/ui/label";
import { studentService } from "@/modules/services/api/student";
import { classService } from "@/modules/services/api/class";
import ClassesSelector from "@/components/class/selector";
import StudentImageCropDialog from "@/components/student/dialog/image-crop";
import { base64ToFile } from "@/modules/helpers/files/base64-to-file";
import FormDialog from "@/components/custom/form-dialog";
import StudentSimpleAddForm from "@/components/student/forms/simple-add";
import { StudentSimpleData } from "@/modules/validations/student";
import StudentSimpleEditForm from "@/components/student/forms/simple-edit";
import { CustomPagination } from "@/components/custom/pagination";
import PageQuantitySelector from "@/components/page-quantity-selector";
import ProfilePicture from "@/components/profile/picture";
import { usePermissions } from "@/modules/hooks/use-permissions";
import AddButton from "@/components/custom/add-button";

export default function StudentsPage() {
  const { hasPermission } = usePermissions();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const filter = searchParams.get("filtro") || undefined;
  const _class = searchParams.get("turma") || undefined;
  const limit = Number(searchParams.get("limit") || 60);
  const page = Number(searchParams.get("page") || 1);
  const [studentImage, setStudentImage] = useState<string>();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<Student>();
  const [studentIdToDeletePhoto, setStudentIdToDeletePhoto] = useState<
    string | null
  >(null);

  const [studentIdToDeleteOriginalPhoto, setStudentIdToDeleteOriginalPhoto] =
    useState<string | null>();

  const [studentIdToDelete, setStudentIdToDelete] = useState<string>();
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);

  const [selectedClassId, setSelectedClassId] = useState(_class);

  const [filterText, setFilterText] = useState(filter);

  const {
    data: studentsData,
    error,
    refetch: refetch,
  } = useQuery({
    queryKey: ["students", filter, selectedClassId, limit, page],
    queryFn: () =>
      studentService.getAll({
        filter,
        _class: selectedClassId === "empty" ? undefined : selectedClassId,
        limit,
        page,
      }),
    enabled: !!selectedClassId,
  });

  const { data: classesData, error: classesError } = useQuery({
    queryKey: ["classes"],
    queryFn: () => classService.getAll(),
  });

  if (classesError)
    toastErrorConfig("Erro ao carregar as turmas", classesError);

  if (error) toastErrorConfig("Erro ao carregar os alunos", error);

  const [selectedStudent, setSelectedStudent] = useState(studentsData?.data[0]);

  const trainingField = useMemo(() => {
    return classesData?.data?.find((c) => c.id === selectedClassId)?.nome_turma
      .curso.area_formacao.nome;
  }, [classesData?.data, selectedClassId]);
  const course = useMemo(() => {
    return classesData?.data?.find((c) => c.id === selectedClassId)?.nome_turma
      .curso.nome;
  }, [classesData?.data, selectedClassId]);

  const room = useMemo(() => {
    const selectedRoom = classesData?.data?.find(
      (c) => c.id === selectedClassId
    )?.sala;

    return selectedRoom
      ? `${selectedRoom.designacao} - ${selectedRoom.sector.abreviacao}`
      : "-";
  }, [classesData?.data, selectedClassId]);

  const turn = useMemo(() => {
    return classesData?.data?.find((c) => c.id === selectedClassId)?.turno;
  }, [selectedClassId, classesData?.data]);

  const handleDelete = async () => {
    await studentService.deletePerson(studentIdToDelete!);
    refetchStudentstList();
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

  const refetchStudentstList = useCallback(() => {
    toastPromiseConfig({
      fn: refetch(),
      loading: "A actualizar a lista de alunos",
      success: "Lista de alunos actualizada com sucesso",
    });
  }, [refetch]);

  const hanldeOnStudentImageClick = useCallback(
    (student: Student, imageSrc?: string) => {
      setStudentToEdit(student);
      setStudentImage(imageSrc);
      setIsCropDialogOpen(true);
    },
    [setStudentImage]
  );
  const handleOnRowClick = useCallback((student: Student) => {
    setSelectedStudent(student);
  }, []);

  const handleConfirm = useCallback(
    async (base64ResultImg: string, base64OriginalImg?: string) => {
      try {
        const newImage = base64ToFile(base64ResultImg, "student-image.jpg");
        const originalImage = base64OriginalImg
          ? base64ToFile(base64OriginalImg, "student-original-image.jpg")
          : undefined;
        const _class = studentToEdit!.aluno_turma.turma.nome_turma.designacao;

        toastPromiseConfig({
          fn: Promise.all([
            studentService
              .updatePhoto(studentToEdit!.id, {
                image: newImage,
                turma: _class,
                n_processo: studentToEdit!.n_processo,
                area_formacao: trainingField!,
              })
              .then(async () => {
                refetchStudentstList();
                setIsCropDialogOpen(false);
              }),
            originalImage
              ? studentService.updateOriginalPhoto(studentToEdit!.id, {
                  image: originalImage,
                  turma: _class,
                  n_processo: studentToEdit!.n_processo,
                  area_formacao: trainingField!,
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
    [studentToEdit, trainingField, refetchStudentstList]
  );

  const deleteOriginalPhoto = async () => {
    await studentService
      .deleteOriginalPhoto(studentIdToDeleteOriginalPhoto!)
      .finally(() => {
        refetchStudentstList();
      });
  };
  const deletePhoto = async () => {
    await studentService.deletePhoto(studentIdToDeletePhoto!).finally(() => {
      refetchStudentstList();
    });
  };

  const handleOnEdit = (student: Student) => {
    setStudentToEdit(student);
    setEditDialogOpen(true);
  };

  const handleSimpleAddDialogSubmit = async (data: StudentSimpleData) => {
    await studentService.simpleCreate(selectedClassId!, data);
    refetchStudentstList();
  };
  const handleSimpleEditDialogSubmit = async (
    data: Partial<StudentSimpleData>
  ) => {
    await studentService.simpleUpdate(
      studentToEdit!.id!,
      studentToEdit!.aluno_turma.turma.id,
      data
    );
    refetchStudentstList();
  };
  const selectedStudentImage = useMemo(() => {
    const studentPhoto = selectedStudent?.pessoa.foto;
    return studentPhoto
      ? `${import.meta.env.VITE_IMAGES_DIR}/${studentPhoto}`
      : undefined;
  }, [selectedStudent]);

  const handleOnClassChange = (classId: string) => {
    setSelectedClassId(classId);
    handleParamChange({
      searchParamsHelpers: { searchParams, navigate },
      key: "turma",
      value: classId,
    });
  };

  useEffect(() => {
    setSelectedStudent(studentsData?.data[0]);

    if (selectedClassId) {
      return;
    }
    const firstClass = classesData?.data[0];
    if (firstClass) {
      setSelectedClassId(firstClass.id);
    }
  }, [studentsData?.data, classesData?.data, selectedClassId]);
  const canCreate = hasPermission("CRIAR");
  const canEdit = hasPermission("EDITAR");
  const canDelete = hasPermission("ELIMINAR");

  return (
    <section className="py-4">
      <h2 className="mt-4 py-2 border-b font-bold text-lg">Filtros</h2>
      <section className="flex justify-between flex-wrap gap-3">
        <div className="mt-2 flex flex-col gap-2 flex-wrap w-max">
          <section className="flex gap-3 items-end">
            <Label className="w-full max-w-[200px] flex flex-col gap-1">
              Turma
              <ClassesSelector
                useEmptyOption
                classes={classesData?.data}
                value={selectedClassId}
                onChange={handleOnClassChange}
              />
            </Label>
            <SearchInput
              value={filterText}
              onChange={(e) => {
                setFilterText(e.target.value);
                onSearch(e.target.value);
              }}
            />
          </section>
          <section className="space-y-2 border-ipilOrange border-[.5px] w-full p-4 rounded-md">
            <p>
              Área de formação:{" "}
              <span className="font-semibold">{trainingField || "-"}</span>
            </p>
            <p>
              Curso: <span className="font-semibold">{course || "-"}</span>
            </p>
            <div className="flex justify-between gap-4">
              <p>
                Sala: <span className="font-semibold">{room || "-"}</span>
              </p>
              <p>
                Período:{" "}
                <span className="font-semibold">
                  {turn?.periodo.nome || "-"}
                </span>
              </p>
              <p>
                Turno:{" "}
                <span className="font-semibold">{turn?.turno || "-"}</span>
              </p>
            </div>
          </section>
        </div>
        <div className="flex items-end justify-center max-md:flex-1">
          <ProfilePicture
            imageUrl={selectedStudentImage}
            name={selectedStudent?.pessoa.nome}
          />
        </div>
      </section>

      <section className="flex justify-between items-end my-4">
        <div className="flex flex-col my-3 gap-2">
          {canCreate && (
            <div>
              <AddButton
                disabled={!selectedClassId}
                onClick={() => setAddDialogOpen(true)}
              >
                Adicionar aluno
              </AddButton>
            </div>
          )}
          <p className="text-nowrap">
            Nº de alunos:{" "}
            <span className="font-bold">{studentsData?.data.length || 0}</span>
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
      <div className="flex justify-end my-2">
        <CustomPagination
          currentPage={page}
          totalPages={studentsData?.info.totalPages}
        />
      </div>
      <StudentsTable
        useClassColumn={selectedClassId === "empty"}
        onRowClick={handleOnRowClick}
        onDelete={canDelete ? handleOnDelte : undefined}
        onImageClick={hanldeOnStudentImageClick}
        students={studentsData?.data}
        onEdit={canEdit ? handleOnEdit : undefined}
        onPassPhotoDelete={(id) => setStudentIdToDeletePhoto(id)}
        onOriginalPhotoDelete={(id) => setStudentIdToDeleteOriginalPhoto(id)}
      />
      <div className="flex justify-end">
        <CustomPagination
          currentPage={page}
          totalPages={studentsData?.info.totalPages}
        />
      </div>
      <AlertDeleteDialog
        subject="aluno"
        message="Ao eliminar este aluno, afirma saber das consequências."
        isOpen={isAlertDialogOpen}
        onCancelClick={() => setIsAlertDialogOpen(false)}
        onConfirm={handleDelete}
      />

      <AlertDeleteDialog
        subject="foto original do aluno"
        message="Ao eliminar a foto original desse aluno, afirma saber das consequências."
        isOpen={!!studentIdToDeleteOriginalPhoto}
        onCancelClick={() => setStudentIdToDeleteOriginalPhoto(null)}
        onConfirm={deleteOriginalPhoto}
      />
      <AlertDeleteDialog
        subject="foto do aluno"
        message="Ao eliminar a foto desse aluno, afirma saber das consequências."
        isOpen={!!studentIdToDeletePhoto}
        onCancelClick={() => setStudentIdToDeletePhoto(null)}
        onConfirm={deletePhoto}
      />

      <FormDialog
        onDialogCloseClick={() => setAddDialogOpen(false)}
        form={StudentSimpleAddForm}
        subject="Adicionar aluno - simples"
        isOpen={addDialogOpen}
        description="Adicione um aluno à turma e clique em 'Concluir' para finalizar a operação"
        onSubmit={handleSimpleAddDialogSubmit}
      />

      <FormDialog
        onDialogCloseClick={() => setEditDialogOpen(false)}
        form={StudentSimpleEditForm}
        subject="Editar aluno - simples"
        isOpen={editDialogOpen}
        description="Edite os dados do aluno e clique em 'Concluir' para finalizar a operação"
        onSubmit={handleSimpleEditDialogSubmit}
        data={{
          ...studentToEdit,
          nome: studentToEdit?.pessoa.nome,
          genero: studentToEdit?.pessoa.genero,
          n_turma: studentToEdit?.aluno_turma.n_turma,
        }}
      />
      <StudentImageCropDialog
        onConfirm={handleConfirm}
        onDialogCloseClick={() => {
          setStudentImage(undefined);
          setIsCropDialogOpen(false);
        }}
        isOpen={isCropDialogOpen}
        imageSrc={studentImage}
        studentName={`${studentToEdit?.pessoa.nome} - ${studentToEdit?.n_processo}`}
      />
    </section>
  );
}
