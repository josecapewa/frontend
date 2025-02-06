import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ColorPicker from "react-pick-color";
import { ControllerRenderProps } from "react-hook-form";

interface CustomColorPickerProps {
  props: ControllerRenderProps<any, string>;
  handleColorChange: (color: string) => void;
}

export default function CustomColorPicker({
  handleColorChange,
  props,
}: CustomColorPickerProps) {
  const onColorChange = (color: { hex: string }) => {
    handleColorChange(color.hex);
    props.onChange(color.hex);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          <Button
            type="button"
            {...props}
            className="w-full bg-gray-400"
            style={{ backgroundColor: props.value }}
          >
            {props.value == undefined
              ? "Clique para escolher a cor"
              : props.value}
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-max p-0 border-none">
        <ColorPicker color={props.value} onChange={onColorChange} />
      </PopoverContent>
    </Popover>
  );
}
