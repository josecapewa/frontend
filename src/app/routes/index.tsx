import { createBrowserRouter, Navigate } from "react-router";
import AppLayout from "../layout";

import LoginPage from "../pages/login";
import CustomNotFoundPage from "../not-found";
import ProtectedRoute from "@/components/auth/protected-route";
import commonSideRoutes from "./common-side";
import { lazy } from "react";

const ProfileSettingsPage = lazy(() => import("../pages/profile-settings"));

const router = createBrowserRouter(
  [
    {
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        ...commonSideRoutes,
        {
          path: "/perfil",
          element: <ProfileSettingsPage />,
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
      path: "/",
      element: <Navigate to="/login" />,
    },
  ],
  { basename: "/" }
);

export default router;
