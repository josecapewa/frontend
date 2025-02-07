import * as React from "react";

import { Sidebar, SidebarContent, SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { X } from "lucide-react";
import TopArea from "./top-area";
import { NavLinks } from "./nav-links";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setOpenMobile, isMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      {isMobile && (
        <X
          className="absolute top-2 left-2 text-white cursor-pointer"
          onClick={() => setOpenMobile(false)}
        />
      )}
      <SidebarHeader>
        <TopArea />
      </SidebarHeader>
      <SidebarContent className="overflow-hidden">
        <NavLinks />
      </SidebarContent>
    </Sidebar>
  );
}
