
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MdSettingsSuggest } from "react-icons/md";

export function ProfileSettings() {
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="p-1 aspect-square">
          <MdSettingsSuggest size={25} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Opções rápidas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
