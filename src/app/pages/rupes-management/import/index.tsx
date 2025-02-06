import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  toastErrorConfig,
  toastPromiseConfig,
} from "@/components/config/toast";
import ImportRupesTable from "@/components/import-rupe/data/table";
import UploadRupe from "@/components/import-rupe/data/upload";
import CustomSelector from "@/components/custom/combo-box";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { tipoRupeService } from "@/modules/services/api/tipo-rupe";
import { useNavigate, useSearchParams } from "react-router";
import { handleParamChange } from "@/modules/helpers/search-params";
import { api } from "@/modules/services/api/config";

export default function ImportRupesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<ImportRupes[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedTypeRupe, setSelectedTypeRupe] = useState<string>();
  const [isRegistering, setIsRegistering] = useState(false);

  const limit = Number(searchParams.get("limit") || 10);
  const page = Number(searchParams.get("page") || 1);
  const filter = searchParams.get("filtro") || undefined;
  const typeRupe = searchParams.get("typeRupe") || undefined;

  const handleUpload = async () => {
    if (!file) {
      toastErrorConfig("Por favor, selecione um arquivo para enviar.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/rupes/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData(response.data.data);
      toastPromiseConfig({
        fn: Promise.resolve(),
        loading: "Importando dados...",
        success: "Arquivo importado com sucesso!",
      });
    } catch (error) {
      console.error("Erro ao enviar o arquivo:", error);
      toastErrorConfig("Erro ao importar os rupes", error);
    } finally {
      setIsUploading(false);
    }
  };
  const { data: typeRupeData, error: typeRupeError } = useQuery({
    queryKey: ["tipo-rupe", limit, page, filter],
    queryFn: () => tipoRupeService.getAll({ limit, page, filter }),
  });
  if (typeRupeError)
    toastErrorConfig("Erro ao carregar os tipos de rupes", typeRupeError);

  const handleRegister = async () => {
    if (data.length === 0) {
      toastErrorConfig("Não há dados para cadastrar.");
      return;
    }

    setIsRegistering(true);
    try {
      toastPromiseConfig({
        fn: api.post("http://localhost:3001/rupes/register", {
          data,
          typeRupe,
        }),

        loading: "Cadastrando os dados...",
        success: "Dados cadastrados com sucesso!",
      });

      setData([]);
      setFile(null);
    } catch (error) {
      console.error("Erro ao cadastrar os dados:", error);
      toastErrorConfig("Erro ao cadastrar os dados", error);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-full max-w-md">
          {/* Upload de arquivo */}
          <UploadRupe
            accept=".csv,.xlsx"
            onFileChange={(file: File | null) => {
              if (file) setFile(file);
            }}
          />
          <div className="mt-4 flex justify-center">
            <Button
              disabled={!file || isUploading}
              onClick={handleUpload}
              className="w-full max-w-xs bg-orange-500 text-white hover:bg-orange-600"
            >
              {isUploading ? "Enviando..." : "Enviar Arquivo"}
            </Button>
          </div>
        </div>

        {/* Seleção de planilha */}
        {data.length > 0 && (
          <div>
            <Label>Tipo Rupe</Label>
            <CustomSelector
              items={typeRupeData?.data.map((option) => ({
                label: option.descricao,
                value: option.id,
              }))}
              value={selectedTypeRupe}
              onChange={(value) => {
                handleParamChange({
                  key: "typeRupe",
                  value,
                  searchParamsHelpers: { searchParams, navigate },
                });
                setSelectedTypeRupe(value);
              }}
              unSelectedLabel="Selecione o tipo de rupe"
            />
          </div>
        )}

        {/* Tabela para Visualizar Dados */}
        {data.length > 0 && (
          <div className="w-full max-w-4xl mx-auto space-y-4">
            <ImportRupesTable rupesData={data} />
            <div className="mt-6 flex justify-center">
              <Button
                disabled={isRegistering || data.length === 0}
                onClick={handleRegister}
                className="w-full max-w-xs bg-orange-500 text-white hover:bg-orange-600"
              >
                {isRegistering ? "Cadastrando..." : "Cadastrar Dados"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
