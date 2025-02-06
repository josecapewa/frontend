import { baseMenuOptions } from "@/lib/side-bar-options";
import { CustomSelectorProps } from "../custom/selector";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SystemScreensSelectorProps = Omit<CustomSelectorProps, "items">;
export default function SystemScreensSelector({
  ...rest
}: SystemScreensSelectorProps) {
  return (
    <Select {...rest} onValueChange={rest.onChange}>
      <SelectTrigger className="text-sm 2xl:h-11">
        <SelectValue placeholder="Selecione uma tela" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Início</SelectLabel>
          <SelectItem value={baseMenuOptions.path}>
            {baseMenuOptions.label}
          </SelectItem>
        </SelectGroup>
        {baseMenuOptions.children?.map((subMenu) => (
          <SelectGroup key={subMenu.path}>
            <SelectLabel>{subMenu.label}</SelectLabel>
            {subMenu.children?.map((child) => (
              <SelectItem key={child.path} value={child.path}>
                {`${subMenu.label} - ${child.label}`}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
