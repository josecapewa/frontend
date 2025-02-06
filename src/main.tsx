import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { ThemeProvider } from "@emotion/react";
import router from "./app/routes/index.tsx";
import { theme } from "@/theme";
import dayjs from "dayjs";
import "dayjs/locale/pt";
import { Toaster } from "sonner";
dayjs.locale("pt");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Toaster closeButton richColors position="top-left" />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
