import { createBrowserRouter, Navigate } from "react-router";
import AppLayout from "../layout";

import LoginPage from "../pages/login";
import CustomNotFoundPage from "../not-found";
import ProtectedRoute from "@/components/auth/protected-route";
import { lazy } from "react";
import benefitsRoutes from "./benefits";
import categoriesRoutes from "./category";

const ProfileSettingsPage = lazy(() => import("../pages/profile-settings"));
const SignUpPage = lazy(() => import("../pages/signup"));
const DashboardPage = lazy(() => import("../pages/dashboard"));

const router = createBrowserRouter(
  [
    {
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        ...benefitsRoutes,
        categoriesRoutes,
        {
          path: "/perfil",
          element: <ProfileSettingsPage />,
        },
        {
          path: "/painel-principal",
          element: <DashboardPage />,
        },
        {
          path: "*",
          element: <CustomNotFoundPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/cadastro",
      element: <LoginPage />,
    },
    {
      path: "/registrar",
      element: <SignUpPage />,
    },
    {
      path: "/",
      element: <Navigate to="/login" />,
    },
  ],
  { basename: "/" }
);

export default router;
