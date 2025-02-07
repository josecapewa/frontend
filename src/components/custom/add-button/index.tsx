import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import React from "react";

const AddButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        className={cn("flex gap-2  lg:text-xl items-center", className)}
      >
        {children}
        <PlusCircle />
      </Button>
    );
  }
);

export default AddButton;
