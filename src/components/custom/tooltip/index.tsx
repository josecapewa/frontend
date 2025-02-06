import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProps } from "@radix-ui/react-tooltip";

interface ICustomToolTipProps extends TooltipProps {
  children: React.ReactNode;
  text: string;
  side?: "top" | "right" | "bottom" | "left" | undefined;
}
export default function CustomToolTip({
  children,
  text,
  delayDuration = 100,
  ...props
}: ICustomToolTipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration} {...props}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={props.side} className="xl:text-xl z-50">
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
