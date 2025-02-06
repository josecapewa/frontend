import * as React from "react";

import { Sidebar, SidebarContent, SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { X } from "lucide-react";
import TopArea from "./top-area";
import { NavLinks } from "./nav-links";
import { useSessionStore } from "@/modules/services/stores/session";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setOpenMobile, isMobile } = useSidebar();
  const user = useSessionStore((state) => state.user);
  return (
    <Sidebar collapsible="icon" {...props}>
      {isMobile && (
        <X
          className="absolute top-2 left-2 text-white cursor-pointer"
          onClick={() => setOpenMobile(false)}
        />
      )}
      <SidebarHeader>
        <TopArea link={user?.pessoa.aluno ? "/painel-do-aluno" : undefined} />
      </SidebarHeader>
      <SidebarContent className="overflow-hidden">
        <NavLinks />
      </SidebarContent>
    </Sidebar>
  );
}
