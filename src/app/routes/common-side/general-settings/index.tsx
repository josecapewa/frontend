import { lazy } from "react";
import { Outlet, RouteObject } from "react-router";

const FileTypesPage = lazy(
  () => import("../../../pages/general-settings/file-types")
);

const ProvincesPage = lazy(
  () => import("../../../pages/general-settings/provinces")
);

const MunicipalitiesPage = lazy(
  () => import("../../../pages/general-settings/municipalities")
);

const CommunesPage = lazy(
  () => import("../../../pages/general-settings/communes")
);

const IdentificationTypesPage = lazy(
  () => import("../../../pages/general-settings/identification-types")
);

const generalSettingsRoutes: RouteObject = {
  path: "/configuracoes-gerais",
  element: <Outlet />,
  children: [
    {
      path: "/configuracoes-gerais/tipos-de-arquivos",
      element: <FileTypesPage />,
    },
    {
      path: "/configuracoes-gerais/provincias",
      element: <ProvincesPage />,
    },
    {
      path: "/configuracoes-gerais/municipios",
      element: <MunicipalitiesPage />,
    },
    {
      path: "/configuracoes-gerais/comunas",
      element: <CommunesPage />,
    },
    {
      path: "/configuracoes-gerais/tipos-de-identificacao",
      element: <IdentificationTypesPage />,
    },
  ],
};

export default generalSettingsRoutes;
