import { AxiosError } from "axios";
import { redirect } from "react-router";
import { toast } from "sonner";

type Position =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center";

interface ApiErrorResponseData {
  message?: string;
}

export const toastErrorConfig = (baseDescription: string, error?: unknown) => {
  let description = "Erro desconhecido";

  if (error instanceof AxiosError) {
    if (error.response) {
      const errorData = error.response.data as ApiErrorResponseData;
      description = errorData.message || "Erro desconhecido do servidor";
    } else if (error.message === "Network Error") {
      description = "Erro ao comunicar com o servidor - Erro de rede";
    } else {
      description = error.message;
    }

    if (error.response?.status === 401) {
      toast.error(baseDescription, {
        description: description,
      });
      redirect("/login");
      return;
    }
  }

  if (error instanceof Error) {
    description = error.message;
  }

  if (typeof error === "string") {
    description = error;
  }

  toast.error(baseDescription, {
    description,

    position: "bottom-right",
  });
};

export const toastSuccessConfig = (
  baseDescription: string,
  position: Position = "bottom-right"
) => {
  toast.success(baseDescription, {
    position,
  });
};

export const toastPromiseConfig = ({
  fn,
  loading,
  success,
  position = "bottom-right",
  finallyFn,
  duration,
}: {
  fn: Promise<any>;
  loading?: string;
  success?: string;
  position?: Position;
  finallyFn?: () => void | Promise<void>;
  duration?: number;
}) => {
  toast.promise(fn, {
    loading,
    success,
    error: (e) => {
      if (e instanceof AxiosError) {
        return handleAxiosError(e);
      }
      if (e instanceof Error) {
        return e.message;
      }
      return "Erro desconhecido";
    },
    position,
    finally: finallyFn,
    
    closeButton: true,
    duration,
  });

  return fn;
};

const handleAxiosError = (e: AxiosError): string => {
  if (e.response) {
    const errorData = e.response.data as ApiErrorResponseData;
    return errorData.message || "Erro desconhecido do servidor";
  }
  return e.message === "Network Error" ? "Erro interno do servidor" : e.message;
};
