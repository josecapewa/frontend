import { lazy } from "react";
import { Navigate, Outlet, RouteObject } from "react-router";

const UsersManagementDashboard = lazy(
  () => import("../../pages/users-management/dashboard")
);

const UsersLevelPage = lazy(
  () => import("../../pages/users-management/user-level")
);
const UsersPage = lazy(() => import("../../pages/users-management/search"));

const UsersAssignmentPage = lazy(
  () => import("../../pages/users-management/assignment")
);

const usersManagementRoutes: RouteObject = {
  path: "/gestao-de-usuarios",
  element: <Outlet />,
  children: [
    {
      path: "/gestao-de-usuarios/painel",
      element: <UsersManagementDashboard />,
    },
    {
      path: "/gestao-de-usuarios/niveis",
      element: <UsersLevelPage />,
    },
    {
      path: "/gestao-de-usuarios/pesquisar",
      element: <UsersPage />,
    },
    {
      path: "/gestao-de-usuarios/atribuicao",
      element: <UsersAssignmentPage />,
    },
    {
      path: "/gestao-de-usuarios",
      element: <Navigate to="/gestao-de-usuarios/painel" />,
    },
  ],
};

export default usersManagementRoutes;
