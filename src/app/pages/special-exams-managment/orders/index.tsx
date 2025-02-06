import CustomTitle from "@/components/custom/title";

export default function SpecialExamsOrdersPage() {
    return (
        <>
            <section>
                <CustomTitle children="Alunos Inscritos" />
                <h2 className="text-xl font-bold text-ipilOrange">Siglas na tabela</h2>
                <div className="pl-2 border-l my-2 border-ipilOrange">
                    <p>
                        <strong>ATP</strong>: Afirma ter pago
                    </p>
                    <p>
                        <strong>ER</strong>: Estado do Rupe
                    </p>
                </div>
            </section>
            Pedidos
        </>
    )
}