import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Send } from "lucide-react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { benefitService } from "@/modules/services/api/benefits";
import { BenefitSkeleton } from "@/components/benefit/skeleton";
import ObtainBenefitForm, {
  ObtainBenefit,
} from "@/components/benefit/form/obtain";

export default function BenefitViewer() {
  const id = useParams<{ id: string }>().id;

  const {
    data: benefit,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["benefits", id],
    queryFn: async () => benefitService.getById(id!),
  });

  if (isLoading) {
    return <BenefitSkeleton />;
  }

  if (!benefit) {
    return (
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 p-6 text-center text-red-600">
        Benefício não encontrado.
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 p-6 text-center text-red-600">
        Erro ao carregar benefício. Tente novamente mais tarde.
      </div>
    );
  }

  const isAvailable =
    benefit?.referencias?.some((referencia) => !referencia.usado) ?? false;

  const handleObtainBenefit = async (data: ObtainBenefit) => {
    console.log("eag",data);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {benefit?.nome}
        </h1>
        <p className="text-gray-700 mb-4">{benefit?.descricao}</p>

        <div className="flex items-center mb-4">
          {isAvailable ? (
            <span className="px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
              Disponível
            </span>
          ) : (
            <span className="px-3 py-1 text-sm font-semibold text-red-700 bg-red-100 rounded-full">
              Indisponível
            </span>
          )}
        </div>

        <div className="border-t pt-4">
          <p className="text-gray-800 font-semibold mb-3">Obter este produto</p>
          <div>
            <ObtainBenefitForm
              onSubmit={handleObtainBenefit}
              isAvailable={isAvailable}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
