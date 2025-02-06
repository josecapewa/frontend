import { lazy } from "react";
import { RouteObject } from "react-router";

const Dashboard = lazy(() => import("@/app/pages/dashboard"));

const commonSideRoutes: RouteObject[] = [
  {
    path: "/painel-principal",
    element: <Dashboard />,
  },
];

export default commonSideRoutes;