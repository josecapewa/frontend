import CustomSelector from "../custom/selector";

export default function DisciplineTypeSelector({
  value,

  useEmptyOption,
  disciplineTypes,
  onChange,
}: {
  value: string | undefined;
  useEmptyOption?: boolean;
  disciplineTypes?: DisciplineType[];
  onChange: (value: string) => void;
}) {
  return (
    <CustomSelector
      useEmptyOption={useEmptyOption}
      unSelectedLabel="Selecione um componente de disciplina"
      value={value}
      items={disciplineTypes?.map((dtype) => ({
        label: dtype.tipo_disciplina,
        value: dtype.id,
      }))}
      onChange={onChange}
    />
  );
}
