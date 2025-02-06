import {
  Bell,
  ChevronsUpDown,
  LogOut,
  MenuIcon,
  Settings2,
  UserCog,
} from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAppStore } from "@/modules/services/stores/app";
import { useLocation, useNavigate } from "react-router";
import { useSessionStore } from "@/modules/services/stores/session";
import { toastPromiseConfig } from "../config/toast";
import { userService } from "@/modules/services/api/user";
import { sessionService } from "@/modules/services/session";
import { exceptionPaths } from "../custom/path-saver";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/modules/helpers/names";

export default function AppHeader() {
  const { toggleSidebar, isMobile, state } = useSidebar();

  const setPreviusLocation = useAppStore((state) => state.setPreviusLocation);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useSessionStore((state) => state.user);
  const setFastSettingsOpen = useAppStore((state) => state.setFastSettingsOpen);

  const userImage = user?.pessoa.foto
    ? `${import.meta.env.VITE_IMAGES_DIR}/${user?.pessoa.foto}`
    : undefined;

  const handleLogout = () => {
    const scrollPosition = window.scrollY;
    const currentPath = pathname;
    toastPromiseConfig({
      fn: userService.logout().then(() => {
        sessionService.removeSessionData();
        navigate("/login", { replace: true });
        if (!exceptionPaths.includes(currentPath)) {
          setPreviusLocation({ position: scrollPosition, path: currentPath });
        }
      }),
      loading: "A terminar sessão...",
      success: "Sessão terminada com sucesso",
    });
  };

  return (
    <header className="transition-all sticky top-0 z-[2] flex w-full shadow-md items-center justify-between h-[55px] gap-2 p-2 bg-white">
      <MenuIcon
        className="text-zinc-950 size-[26px] transition-all cursor-pointer h-full "
        onClick={toggleSidebar}
      />
      <div className="mx-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="text-zinc-950">
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-xs font-semibold">
                  {user?.pessoa.nome}
                </span>
              </div>
              <Avatar className="size-10 rounded-full">
                <AvatarImage src={userImage} alt={user?.pessoa.nome} />
                <AvatarFallback className="rounded-full text-zinc-950 font-bold">
                  {getInitials(user?.pessoa.nome)}
                </AvatarFallback>
              </Avatar>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={"bottom"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full text-zinc-950 font-bold">
                  <AvatarImage src={userImage} alt={user?.pessoa.nome} />
                  <AvatarFallback className="rounded-full">
                    {getInitials(user?.pessoa.nome)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.pessoa.nome}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                <Bell />
                Notificações
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setFastSettingsOpen(true)}>
              <Settings2 />
              Configurações rápidas
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/perfil")}>
              <UserCog />
              Configurações do perfil
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Terminar Sessão
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
