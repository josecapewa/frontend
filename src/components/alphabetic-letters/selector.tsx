import { alphabetOptions } from "@/lib/utils";
import CustomSelector from "../custom/selector";


export default function AlphabeticLettersSelector({
  onChange,
  useAnythingOption,
  value,
}: {
  onChange: (value: string) => void;
  value?: string;
  useAnythingOption?: boolean;
}) {
  return (
    <CustomSelector
      items={alphabetOptions}
      onChange={onChange}
      value={value}
      useEmptyOption={useAnythingOption}
      unSelectedLabel="Seleccione uma letra"
    />
  );
}
