import BenefitViewer from "@/app/pages/benefits/viewer";
import { lazy } from "react";
import { RouteObject } from "react-router";

const BenefitsPage = lazy(() => import("../../pages/benefits"));

const benefitsRoutes: RouteObject[] = [
  {
    path: "/beneficios",
    element: <BenefitsPage />,
  },
  {
    path: "/beneficios/:id",
    element: <BenefitViewer />,
  },
];

export default benefitsRoutes;
