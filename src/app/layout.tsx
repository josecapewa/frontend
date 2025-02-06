import { Suspense, useEffect, useState } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import QueryProvider, { queryClient } from "./query-provider";
import AppHeader from "@/components/header";
import AppLoading from "./loading";
import CustomTitle from "@/components/custom/title";
import { useAppStore } from "@/modules/services/stores/app";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/side-bar";
import { getRandomImageQuery } from "@/lib/utils";
import { api } from "@/modules/services/api/config";
import { toastErrorConfig } from "@/components/config/toast";
import FastSettingsDialog from "@/components/fast-settings-dialog";
import { useImagesBuster } from "@/modules/hooks/use-image-buster";
import PathRestorer from "@/components/custom/path-restorer";
import ConfirmSessionDialog from "@/components/user/dialog/confirm-session";
export default function AppLayout() {
  const [sessionExpired, setSessionExpired] = useState(false);
  const imageQuery = useAppStore((state) => state.imageQuery);
  useImagesBuster(imageQuery ?? "");
  const selectedMenu = useAppStore((state) => state.selectedMenu);
  const setImageQuery = useAppStore((state) => state.setImageQuery);
  const setFastSettingsOpen = useAppStore((state) => state.setFastSettingsOpen);
  const fastSettingsOpen = useAppStore((state) => state.fastSettingsOpen);

  const Icon = selectedMenu?.icon;
  const title = selectedMenu?.label;

  useEffect(() => {
    setImageQuery(getRandomImageQuery());

    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response?.status === 401 &&
          error.response?.config.url !== "/login"
        ) {
          if (!sessionExpired) {
            queryClient.cancelQueries();
            toastErrorConfig(
              "A sua sessão expirou, confirme suas credenciais e tente novamente",
              error
            );
            setSessionExpired(true);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  const handleConfirmSession = () => {
    queryClient.refetchQueries();
    setSessionExpired(false);
  };

  return (
    <QueryProvider>
      <SidebarProvider className="h-screen">
        <AppSidebar />
        <PathRestorer />
        <ScrollRestoration />
        <ConfirmSessionDialog
          onConfirm={handleConfirmSession}
          open={sessionExpired}
        />
        <main className="w-full overflow-hidden bg-[#F8F9FC]">
          <AppHeader />
          <div className="h-full custom_scroll overflow-x-hidden max-h-[calc(100vh-55px)] relative">
            <section className="p-4  w-full mx-auto">
              {title && title.trim().length > 0 && (
                <CustomTitle useCircle={false}>
                  {Icon && <Icon className="text-ipilGray" />}
                  {title}
                </CustomTitle>
              )}
              <Suspense fallback={<AppLoading />}>{<Outlet />}</Suspense>
            </section>
          </div>
        </main>
        <FastSettingsDialog
          isOpen={fastSettingsOpen}
          onDialogCloseClick={() => setFastSettingsOpen(false)}
        />
      </SidebarProvider>
    </QueryProvider>
  );
}
