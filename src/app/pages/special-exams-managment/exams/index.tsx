import {
  toastErrorConfig,
  toastPromiseConfig,
} from "@/components/config/toast";
import { coursesService } from "@/modules/services/api/course";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AlertDeleteDialog from "@/components/custom/alert-delete";
import FormDialog from "@/components/custom/form-dialog";
import CourseAddForm from "@/components/course/form/add";
import CourseEditForm from "@/components/course/form/edit";
import { CustomPagination } from "@/components/custom/pagination";
import PageQuantitySelector from "@/components/page-quantity-selector";
import {
  handleOnSearch,
  handleParamChange,
} from "@/modules/helpers/search-params";
import { useNavigate, useSearchParams } from "react-router";
import SearchInput from "@/components/custom/search-input";
import { useDebounce } from "@/modules/hooks/use-debounce";
import { trainingFieldService } from "@/modules/services/api/training-field";
import { Label } from "@/components/ui/label";
import CoursesTable from "@/components/course/data/table";
import TrainingFieldSelector from "@/components/training-field/selector";
import { usePermissions } from "@/modules/hooks/use-permissions";
import {
  rupesExamsService,
  studentExamService,
} from "@/modules/services/api/special-exams";
import { rupeValues } from "@/lib/definitions/rupes-values";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import SaidPaidFilter from "@/components/special-exams/filters/said-paid";
import PaymentFilter from "@/components/special-exams/filters/payment";
import HasDeclarationFilter from "@/components/special-exams/filters/has-declaration";
import RupeTermFilter from "@/components/special-exams/filters/rupe-term";
import EmitFilter from "@/components/special-exams/filters/can-emit";
import StudentsExamTable from "@/components/special-exams/tables/exams";
import StudentExamViewDialog from "@/components/special-exams/dialogs/student-exam";
import { TPossiblePayment } from "../../../../../components/special-exams/filters/payment";
import { set } from "zod";

export default function SpecialExamsPage() {
  const { hasPermission } = usePermissions();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const said = searchParams.get("said") as "yes" | "no" | undefined;
  const payment = searchParams.get("payment") as "paid" | "unPaid" | undefined;
  const hasDeclaration = searchParams.get("has-declaration") as
    | "yes"
    | "no"
    | undefined;

  const rupeTerm = searchParams.get("rupe-term") as "in" | "out" | undefined;
  const canEmit = searchParams.get("can-emit") as "yes" | "no" | undefined;

  const coursesData = {
    data: {},
    info: {},
  };

  const limit = Number(searchParams.get("limit")) || undefined;
  const page = Number(searchParams.get("page") || 1);
  const filter = searchParams.get("filtro") || undefined;

  const {
    data: rupes,
    error: rupesError,
    refetch: refetchRupes,
  } = useQuery({
    queryKey: ["rupes"],
    queryFn: () => rupesExamsService.getAll(),
  });

  const {
    data: studentsExamsData,
    error: studentsExamsError,
    refetch: refetchStudents,
  } = useQuery({
    queryKey: [
      "studentsExams",
      limit,
      page,
      filter,
      said,
      payment,
      hasDeclaration,
      rupeTerm,
      canEmit,
    ],
    queryFn: () =>
      studentExamService.getAll({
        limit,
        page,
        filter,
        said,
        payment,
        hasDeclaration,
        rupeTerm,
        canEmit,
      }),
  });

  const { data: trainingFieldsData, error: trainingFieldsError } = useQuery({
    queryKey: ["trainingFields"],
    queryFn: () => trainingFieldService.getAll(),
  });

  if (trainingFieldsError)
    toastErrorConfig(
      "Erro ao carregar os campos de formação",
      trainingFieldsError
    );

  if (rupesError) toastErrorConfig("Erro ao carregar as rupes", rupesError);
  if (studentsExamsError)
    toastErrorConfig("Erro ao carregar os alunos", studentsExamsError);

  const [filterText, setFilterText] = useState(filter || "");

  const [rupeToEdit, setRupeToEdit] = useState<{
    studentExam?: StudentExam;
    rupe: RupeExam;
  }>({ rupe: {} as RupeExam });

  const [isRupeEditDialogOpen, setIsRupeEditDialogOpen] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);

  const [isChangingEmit, setIsChangingEmit] = useState(false);
  const [studentToView, setStudentToView] = useState<StudentExam>();
  const [studentToEdit, setStudentToEdit] = useState<Partial<StudentExam>>();
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [declarationToView, setDeclarationToView] = useState<string>();
  const [isDeclarationPeviewDialogOpen, setIsDeclarationPreviewDialogOpen] =
    useState(false);

  const [saidState, setSaidState] = useState<"yes" | "no" | undefined>(said);
  const [paymentState, setPaymentState] = useState<
    "paid" | "unPaid" | undefined
  >(payment);
  const [hasDeclarationState, setHasDeclarationState] = useState<
    "yes" | "no" | undefined
  >(hasDeclaration);
  const [rupeTermState, setRupeTermState] = useState<"in" | "out" | undefined>(
    rupeTerm
  );
  const [canEmitState, setCanEmitState] = useState<"yes" | "no" | undefined>(
    canEmit
  );

  const refetchAll = async () => {
    await Promise.all([refetchRupes(), refetchStudents()]);
  };

  const handleOnTableNameClick = (student: StudentExam) => {
    setStudentToView(student);
    setIsViewDialogOpen(true);
  };

  const handleOnStatusChange = (
    id_rupe: string,
    paid?: boolean,
    paymentDate?: Date
  ) => {
    setIsChangingStatus(true);

    toastPromiseConfig({
      fn: rupesExamsService
        .update(id_rupe, {
          pago: paid,
          data_pagamento: paymentDate?.toString(),
        })
        .finally(() => {
          refetchAll().finally(() => setIsChangingStatus(false));
        }),
      loading: "Atualizando dados...",
      success: "Dados atualizados com sucesso!",
    });
  };

  const handleOnRupeEditSubmit = async (
    id: string,
    dataToUpdate: {
      id_rupe: string;
    }
  ) => {
    // await ExamService.updateAlunoRupe(id, {
    //   ...dataToUpdate,
    //   id_old_rupe: rupeToEdit.rupe.id,
    // }).finally(async () => {
    //   await refetch();
    //   setIsRupeEditDialogOpen(false);
    // });
  };

  const handleOnCanEmitChange = (id: string, canEmit: boolean) => {
    setIsChangingEmit(true);
    console.log();
    toastPromiseConfig({
      fn: studentExamService
        .update(id, { pode_emitir: canEmit })
        .finally(
          async () => await refetchAll().finally(() => setIsChangingEmit(false))
        ),
      loading: "Atualizando permissões do aluno...",
      success: "Permissões do aluno actualizadas com sucesso!",
    });
  };

  const handleOnEditDialogSubmit = async (data: TExamDataToUpdate) => {
    if (studentToEdit?.id) {
      await studentExamService.update(studentToEdit.id, data);
    }
    await refetch();
    setIsEditDialogOpen(false);
  };

  const handleOnAddDialogSubmit = async (data: CourseToCreate) => {
    await coursesService.create(data);
    await refetchAll();
    setIsAddDialogOpen(false);
  };

  const onSearch = useDebounce(
    (text: string) =>
      handleOnSearch({
        text,
        searchParamsHelpers: { searchParams, navigate },
      }),
    500
  );

  const onFilterParams = (key: string, value?: string) => {
    handleParamChange({
      key,
      value: value ? value : "empty",
      searchParamsHelpers: { searchParams, navigate },
    });
  };

  const canCreate = hasPermission("CRIAR");
  const canDelete = hasPermission("ELIMINAR");
  const canEdit = hasPermission("EDITAR");
  return (
    <section className="py-4">
      <h2 className="mt-4 py-2 border-b font-bold text-lg">Filtros</h2>
      <section className="mt-2 flex gap-2 items-end flex-wrap">
        <SearchInput
          value={filterText}
          onChange={(e) => {
            setFilterText(e.target.value);
            onSearch(e.target.value);
          }}
        />
        <SaidPaidFilter
          value={saidState ? saidState : "empty"}
          onChange={(option) => {
            onFilterParams("said", option);
            setSaidState(option === "empty" ? undefined : option);
          }}
        />
        <PaymentFilter
          value={paymentState ? paymentState : "empty"}
          onChange={(option) => {
            onFilterParams("payment", option);
            setPaymentState(option === "empty" ? undefined : option);
          }}
        />
        <HasDeclarationFilter
          value={hasDeclarationState ? hasDeclarationState : "empty"}
          onChange={(option) => {
            onFilterParams("has-declaration", option);
            setHasDeclarationState(option === "empty" ? undefined : option);
          }}
        />
        <RupeTermFilter
          value={rupeTermState ? rupeTermState : "empty"}
          onChange={(option) => {
            onFilterParams("rupe-term", option);
            setRupeTermState(option === "empty" ? undefined : option);
          }}
        />
        <EmitFilter
          value={canEmitState ? canEmitState : "empty"}
          onChange={(option) => {
            onFilterParams("can-emit", option);
            setCanEmitState(option === "empty" ? undefined : option);
          }}
        />
        {/* <GenerateExamPdfZipButton students={students?.data || []} /> */}
      </section>
      <h2 className="mt-4 py-2 border-b font-bold text-lg">Siglas na tabela</h2>
      <div className="flex gap-2 pt-4 items-center justify-end">
        <section className="flex-1 w-full justify-start">
          <div className="pl-2 border-l my-2 border-ipilOrange">
            <p>
              <strong>ATP</strong>: Afirma ter pago
            </p>
            <p>
              <strong>ER</strong>: Estado do Rupe
            </p>
          </div>
        </section>
        <PageQuantitySelector
          useAllOption
          value={limit}
          navigateFunction={navigate}
          searchParams={searchParams}
        />
        Por página
      </div>
      <div className="my-4 flex justify-end w-full">
        <CustomPagination
          currentPage={page}
          totalPages={studentsExamsData?.info.totalPages}
        />
      </div>
      <p className="text-center">
        Resultados:{" "}
        <span className="font-bold">{studentsExamsData?.data.length || 0}</span>
      </p>
      <StudentsExamTable
        onDeclarationClick={(student) => {
          setDeclarationToView(student.declaracao!);
          setIsDeclarationPreviewDialogOpen(true);
        }}
        onEditClick={
          canEdit
            ? (student) => {
                setStudentToEdit(student);
                setIsEditDialogOpen(true);
              }
            : undefined
        }
        isChangingCanEmit={isChangingEmit}
        onNameCLick={handleOnTableNameClick}
        isChangingStatus={isChangingStatus}
        students={studentsExamsData?.data}
        onChange={handleOnStatusChange}
        onCanEmitChange={handleOnCanEmitChange}
        onRupeClick={(student, rupe) => {
          setRupeToEdit({
            rupe,
            studentExam: student,
          });
          setIsRupeEditDialogOpen(true);
        }}
      />

      <StudentExamViewDialog
        onClose={() => setIsViewDialogOpen(false)}
        student={studentToView}
        trainingFields={trainingFieldsData?.data}
        isOpen={isViewDialogOpen}
      />
      <StudentExamEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        defaultValues={{
          ...defaultValues,
          n_processo: Number(defaultValues.n_processo),
        }}
        onSubmit={handleOnEditDialogSubmit}
      />
      <div className="my-4 flex justify-end w-full">
        <CustomPagination
          currentPage={page}
          totalPages={studentsExamsData?.info.totalPages}
        />
      </div>
      {/* <FormDialog<CourseToCreate, CourseToUpdate, CourseFormOtherData>
        onSubmit={handleOnAddDialogSubmit}
        onDialogCloseClick={() => setIsAddDialogOpen(false)}
        isOpen={isAddDialogOpen}
        form={CourseAddForm}
        subject="Curso"
        description="Adicione um curso à Instituição e clique em 'Criar' para finalizar a operação"
        otherData={{ trainingFields: trainingFieldsData?.data }}
      />
      <FormDialog<CourseToUpdate, CourseToUpdate, CourseFormOtherData>
        onSubmit={handleOnEditDialogSubmit}
        isOpen={isEditDialogOpen}
        onDialogCloseClick={() => setIsEditDialogOpen(false)}
        data={studentExamToEdit}
        form={CourseEditForm}
        subject="Curso"
        description="Edite o curso e clique em "
      /> */}
    </section>
  );
}
