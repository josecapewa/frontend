"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

type Item = {
  label: string;
  value: string;
};
export type CustomSelectorProps = {
  items?: Item[];
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  useEmptyOption?: boolean;
  unSelectedLabel?: string;
  emptyLabel?: string;
  disabled?: boolean;

};
export default function CustomSelector({

  items,
  onChange,
  label = "Opções",
  useEmptyOption,
  unSelectedLabel = "Seleccione...",
  emptyLabel,
  ...rest
}: CustomSelectorProps) {
  return items ? (
    <Select onValueChange={onChange} {...rest}>
      <SelectTrigger className="text-sm min-w-[180px] 2xl:text-lg 2xl:h-11">
        <SelectValue placeholder={unSelectedLabel} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="2xl:text-lg">
          <SelectLabel>
            {items.length != 0
              ? label
              : `Sem ${label.toLowerCase()} - adicione uma`}
          </SelectLabel>
          {useEmptyOption && (
            <SelectItem className="2xl:text-lg" value="empty">{emptyLabel ?? "Nenhum(a)"}</SelectItem>
          )}
          {items.map((item) => (
            <SelectItem className="2xl:text-lg" key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ) : (
    <Skeleton className="w-full px-3 py-2 h-10 2xl:h-11 rounded-md" />
  );
}
