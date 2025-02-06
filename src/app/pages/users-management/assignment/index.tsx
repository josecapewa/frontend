import {
  toastErrorConfig,
  toastPromiseConfig,
} from "@/components/config/toast";
import AssignUserDialog from "@/components/user/assignment/dialog/confirm";
import UsersAssignmentTabs from "@/components/user/assignment/tabs";
import {
  handleOnSearch,
  handleParamChange,
} from "@/modules/helpers/search-params";
import { useDebounce } from "@/modules/hooks/use-debounce";
import { classService } from "@/modules/services/api/class";
import { studentService } from "@/modules/services/api/student";
import { userService } from "@/modules/services/api/user";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

export default function UserAssignmentPage() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const filter = searchParams.get("filtro") || undefined;
  const _class = searchParams.get("turma") || undefined;
  const limit = Number(searchParams.get("limit") || 60);
  const studentsPage = Number(searchParams.get("students_page") || 1);
  const teachersPage = Number(searchParams.get("teachers_page") || 1);
  const othersPage = Number(searchParams.get("others_page") || 1);

  const [selectedClassId, setSelectedClassId] = useState(_class);
  const [personToAssign, setPersonToAssign] = useState<Person | null>(null);
  const [filterText, setFilterText] = useState(filter);

  const {
    data: studentsData,
    error,
    refetch,
  } = useQuery({
    queryKey: ["students", filter, _class, limit, studentsPage],
    queryFn: () =>
      studentService.getAll({
        filter,
        _class,
        limit,
        page: studentsPage,
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

  const handleOnClassChange = (classId: string) => {
    setSelectedClassId(classId);
    handleParamChange({
      searchParamsHelpers: { searchParams, navigate },
      key: "turma",
      value: classId,
    });
  };

  const onSearch = useDebounce(
    (text: string) =>
      handleOnSearch({
        text,
        searchParamsHelpers: { searchParams, navigate },
      }),
    500
  );

  useEffect(() => {
    if (selectedClassId) {
      return;
    }
    const firstClass = classesData?.data[0];
    if (firstClass) {
      setSelectedClassId(firstClass.id);
      handleParamChange({
        searchParamsHelpers: { searchParams, navigate },
        key: "turma",
        value: firstClass.id,
      });
    }
  }, [studentsData?.data, classesData?.data, selectedClassId]);

  const handleConfirmAssign = (telefone: string) => {
    toastPromiseConfig({
      fn: userService
        .assign({ telefone, id_pessoa: personToAssign!.id })
        .then(async () => {
          await refetch();
          setPersonToAssign(null);
        }),
      loading: "Atribuindo o usuário",
      success: "Usuário atribuído com sucesso",
    });
  };
  return (
    <section>
      <UsersAssignmentTabs
        currentPages={{
          students: studentsPage,
          teachers: teachersPage,
          others: othersPage,
        }}
        totalPages={{
          students: studentsData?.info.totalPages,
          teachers: 0,
          others: 0,
        }}
        onAddUser={(personalData) => setPersonToAssign(personalData)}
        filterText={filterText}
        _class={selectedClassId}
        onClassChange={handleOnClassChange}
        classes={classesData?.data}
        onFilterTextChange={(value) => {
          setFilterText(value);
          onSearch(value);
        }}
        students={studentsData?.data}
      />
      <AssignUserDialog
        personalData={personToAssign!}
        onCancel={() => setPersonToAssign(null)}
        onConfirm={handleConfirmAssign}
        open={!!personToAssign}
      />
    </section>
  );
}
