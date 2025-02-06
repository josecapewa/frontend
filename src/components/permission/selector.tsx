import CustomSelector, { CustomSelectorProps } from "../custom/selector";

export const permissionList:Permission[] = ["CRIAR", "VISUALISAR", "EDITAR", "ELIMINAR"];

type PermissionSelectorProps = Omit<CustomSelectorProps, "items">;

export default function PermissionSelector({
  ...rest
}: PermissionSelectorProps) {
  return (
    <CustomSelector
      items={permissionList.map((permission) => ({
        label: permission,
        value: permission,
      }))}
      {...rest}
    />
  );
}
