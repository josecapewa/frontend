import { handleParamChange } from "@/modules/helpers/search-params";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { NavigateFunction } from "react-router";

export default function PageQuantitySelector({
  value,
  step = 5,
  quantity = 20,
  navigateFunction,
  searchParams,
  useAllOption,
}: {
  value?: number;
  step?: number;
  quantity?: number;
  navigateFunction: NavigateFunction;
  searchParams: URLSearchParams;
  useAllOption?: boolean;
}) {
  const onChange = (value: string) => {
    handleParamChange({
      key: "limit",
      value,
      searchParamsHelpers: {
        navigate: navigateFunction,
        searchParams,
      },
    });
  };

  return (
    <Select value={value?.toString() ?? "empty"} onValueChange={onChange}>
      <SelectTrigger className="min-w-20 w-max">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Quantidades</SelectLabel>
          {useAllOption && <SelectItem value="empty">Tudo</SelectItem>}
          {Array.from({ length: quantity }).map((_, ind) => (
            <SelectItem key={ind} value={((ind + 1) * step).toString()}>
              {(ind + 1) * step}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
