import ClassesSelector from "@/components/class/selector";
import { CustomPagination } from "@/components/custom/pagination";
import SearchInput from "@/components/custom/search-input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentsAssignmentTable from "./table/students";

export default function UsersAssignmentTabs({
  students,
  onClassChange,
  classes,
  _class,
  filterText,
  onFilterTextChange,
  totalPages,
  currentPages,
  onAddUser,
}: {
  students?: Student[];
  onClassChange: (value: string) => void;
  classes?: Class[];
  _class?: string;
  filterText?: string;
  onFilterTextChange: (value: string) => void;
  totalPages: { students?: number; teachers?: number; others?: number };
  currentPages: { students: number; teachers: number; others: number };
  onAddUser?: (personalData: Person) => void;
}) {
  const isClassEmpty = _class === "empty";
  return (
    <Tabs defaultValue="students" className="w-full">
      <TabsList className="w-full flex [&>*]:w-full max-w-screen-xl mx-auto">
        <TabsTrigger value="students">Alunos</TabsTrigger>
        <TabsTrigger value="teachers">Professores</TabsTrigger>
        <TabsTrigger value="others">Outros</TabsTrigger>
      </TabsList>
      <section className="flex gap-3 items-end my-4">
        <Label className="w-full max-w-[200px] flex flex-col gap-1">
          Turma
          <ClassesSelector
            useEmptyOption
            classes={classes}
            value={_class}
            onChange={onClassChange}
          />
        </Label>
        <SearchInput
          value={filterText}
          onChange={(e) => {
            onFilterTextChange(e.target.value);
          }}
        />
      </section>
      <TabsContent value="students">
        {isClassEmpty && (
          <div className="flex justify-end my-2">
            <CustomPagination
              prefix="students"
              currentPage={currentPages.students}
              totalPages={totalPages.students}
            />
          </div>
        )}
        <StudentsAssignmentTable
          useClassColumn={isClassEmpty}
          students={students}
          onAddUser={onAddUser}
        />
        {isClassEmpty && (
          <div className="flex justify-end my-2">
            <CustomPagination
              prefix="students"
              currentPage={currentPages.students}
              totalPages={totalPages.students}
            />
          </div>
        )}
      </TabsContent>
      <TabsContent value="teachers">Professores</TabsContent>
      <TabsContent value="others">Outros</TabsContent>
    </Tabs>
  );
}
