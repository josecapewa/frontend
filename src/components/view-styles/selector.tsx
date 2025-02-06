import { useAppStore } from "@/modules/services/stores/app";
import { viewStyles } from "@/lib/definitions/view-style";
import CustomSelector from "../custom/selector";

export default function ViewStyleSelector() {
  const viewStyle = useAppStore((state) => state.viewStyle);
  const setViewStyle = useAppStore((state) => state.setViewStyle);
  return (
    <CustomSelector
      value={viewStyle}
      onChange={(value) => setViewStyle(value as TPossibleViewStyles)}
      items={viewStyles.map((style) => ({
        value: style.value,
        label: style.name,
      }))}
    />
  );
}
