import { lazy } from "react";
import { RouteObject } from "react-router";

const CategoriesPage = lazy(() => import("../../pages/category"));

const categoriesRoutes: RouteObject = {
  path: "/categorias",
  element: <CategoriesPage />,
};

export default categoriesRoutes;
