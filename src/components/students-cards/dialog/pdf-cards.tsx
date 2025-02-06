import { pdf } from "@react-pdf/renderer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toastErrorConfig } from "@/components/config/toast";
import { Loader2Icon, Save, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { StudentPDFCards } from "../card/pdf/cards";

export default function StudentPdfCardsDialog({
  onDialogCloseClick,
  isOpen,
  cardModel,
  students,
  onSavePDF,
}: {
  isOpen?: boolean;
  onDialogCloseClick: () => void;
  students?: (StudentInClassCard & { cardModel?: CardModel })[];
  cardModel?: CardModel;
  onSavePDF: (pdfFile: File) => void;
}) {
  const _class = students?.[0]?.turma.nome_turma.designacao;
  const [loading, setLoading] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  // Gera o Blob sempre que as dependências mudarem
  useEffect(() => {
    const generateBlob = async () => {
      if (!students || !cardModel || !isOpen) {
        setPdfBlob(null);
        return;
      }
      if (!students?.every((student) => student.cardModel)) {
        toastErrorConfig(
          "Erro ao gerar o PDF",
          "Nenhum modelo de cartão foi encontrado"
        );
        return;
      }
      setLoading(true);
      try {
        const blob = await pdf(
          <StudentPDFCards students={students} />
        ).toBlob();
        setPdfBlob(blob);
      } catch (error) {
        toastErrorConfig("Erro ao gerar o PDF", error);
      } finally {
        setLoading(false);
      }
    };
    generateBlob();
  }, [isOpen, students, cardModel]);

  const savePDF = () => {
    if (!pdfBlob) return;
    try {
      const file = new File([pdfBlob], `${_class}.pdf`, {
        type: "application/pdf",
      });
      onSavePDF(file);
    } catch (error) {
      toastErrorConfig("Erro ao guardar arquivo", error);
    }
  };

  const previewPDF = () => {
    if (!pdfBlob) return;
    try {
      const url = URL.createObjectURL(pdfBlob);
      window.open(url, "_blank");
    } catch (error) {
      toastErrorConfig("Erro ao gerar a pré-visualização do PDF", error);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="custom_scroll"
        onDialogCloseClick={onDialogCloseClick}
      >
        <DialogHeader>
          <DialogTitle>Cartões da {_class}</DialogTitle>
          <DialogDescription>
            {!pdfBlob || loading
              ? "Aguarde enquanto o PDF é gerado..."
              : "PDF gerado com sucesso. Faça o download ou visualize o PDF em outra aba"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end my-3 gap-3">
          {!pdfBlob || loading ? (
            <span className="flex gap-2">
              Gerando PDF
              <Loader2Icon className="animate-spin text-ipilOrange" />
            </span>
          ) : (
            <>
              <Button
                className="flex gap-2"
                disabled={!pdfBlob || loading}
                onClick={previewPDF}
              >
                Pré-visualizar <ExternalLink />
              </Button>
              <Button
                className="flex gap-2"
                disabled={!pdfBlob || loading}
                onClick={savePDF}
              >
                Guardar arquivo <Save />
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
