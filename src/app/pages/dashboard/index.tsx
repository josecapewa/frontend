import { toastErrorConfig } from "@/components/config/toast";
import CustomTitle from "@/components/custom/title";
import { GradesTotalStudentsByGenderChart } from "@/components/dashboard/charts/total-grades-students-by-gender";
import { TrainingFieldTotalCoursesChart } from "@/components/dashboard/charts/training-field-total-courses";
import { TrainingFieldTotalCoursesStudentsChart } from "@/components/dashboard/charts/training-field-total-courses-students";
import { TrainingFieldTotalStudentsChart } from "@/components/dashboard/charts/training-field-total-students";
import StatisticCard from "@/components/statistic/cards/normal";
import StatisticRadialCard from "@/components/statistic/cards/radial";

import { statisticService } from "@/modules/services/api/statistic";
import { useSessionStore } from "@/modules/services/stores/session";
import { useQuery } from "@tanstack/react-query";
import { FaGraduationCap } from "react-icons/fa";
import { IoBook } from "react-icons/io5";

export default function Dashboard() {
  const user = useSessionStore((state) => state.user);

  const { data: totalCourses, error } = useQuery({
    queryKey: ["totalCourses"],
    queryFn: statisticService.getTotalCourses,
  });

  const { data: totalCoursesStudents, error: totalCoursesStudentsError } =
    useQuery({
      queryKey: ["totalCoursesStudents"],
      queryFn: statisticService.getTotalCoursesStudentsByGender,
    });

  const { data: totalGradesStudents, error: totalGradesStudentsError } =
    useQuery({
      queryKey: ["totalGradesStudents"],
      queryFn: statisticService.getTotalGradesStudentsByGender,
    });

  const {
    data: trainingFieldTotalCourses,
    error: traningFieldsTotalCoursesError,
  } = useQuery({
    queryKey: ["trainingFieldTotalCourses"],
    queryFn: statisticService.getTrainingFieldsTotalCourses,
  });
  const { data: totalStudents, error: totalStudentsError } = useQuery({
    queryKey: ["totalStudents"],
    queryFn: statisticService.getTotalStudents,
  });

  const {
    data: trainingFieldsTotalStudents,
    error: trainingFieldsTotalStudentsError,
  } = useQuery({
    queryFn: statisticService.getTrainingFieldsTotalStudents,
    queryKey: ["trainingFieldsTotalStudents"],
  });

  if (totalGradesStudentsError)
    toastErrorConfig(
      "Erro ao carregar total de alunos por curso",
      totalGradesStudentsError
    );
  if (totalCoursesStudentsError)
    toastErrorConfig(
      "Erro ao carregar total de alunos por curso",
      totalCourses
    );

  if (trainingFieldsTotalStudentsError)
    toastErrorConfig(
      "Erro ao carregar total de alunos por área",
      trainingFieldsTotalStudentsError
    );

  if (error) toastErrorConfig("Erro ao carregar total de cursos", error);
  if (totalStudentsError)
    toastErrorConfig("Erro ao carregar áreas de formação", totalStudentsError);
  if (traningFieldsTotalCoursesError)
    toastErrorConfig(
      "Erro ao carregar total de cursos por área",
      traningFieldsTotalCoursesError
    );

  return (
    <section>
      {!user?.pessoa.aluno && <CustomTitle>Painel Principal</CustomTitle>}
      <div className="flex flex-col gap-4">
        <div className="flex w-full gap-4 [&>*]:flex-1 flex-wrap">
          <StatisticCard
            value={totalCourses}
            title="Total de cursos"
            icon={<IoBook className="size-8" />}
          />
          <StatisticRadialCard
            value={totalStudents}
            title="Total de alunos"
            icon={<FaGraduationCap className="size-8" />}
          />
        </div>

        <TrainingFieldTotalCoursesStudentsChart
          coursesTotalStudents={totalCoursesStudents}
        />
        <GradesTotalStudentsByGenderChart
          gradesTotalStudents={totalGradesStudents}
        />
        <div className="flex [&>*]:flex-grow [&>*]:flex-1 [&>*]:min-w-[315px] flex-wrap gap-4 mb-24">
          <TrainingFieldTotalStudentsChart
            traningFieldStatus={trainingFieldsTotalStudents}
            lectiveYear={"2024-2025"}
          />
          <TrainingFieldTotalCoursesChart
            trainingFieldTotalCourses={trainingFieldTotalCourses}
          />
        </div>
      </div>
    </section>
  );
}
