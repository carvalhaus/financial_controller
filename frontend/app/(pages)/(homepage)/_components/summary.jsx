import Image from "next/image";

function SummarySection() {
    return (
        <section className="w-full flex flex-col text-center lg:text-left lg:flex-row items-center justify-center py-6 lg:py-20 gap-8 lg:gap-32">
            <div className="max-w-[480px]">
                <h2 className="pb-2 text-3xl font-semibold tracking-tight first:mt-0">Resumo Financeiro Automatizado</h2>
                <p className="leading-7 [&:not(:first-child)]:mt-2">Proporciona ao usuário uma visão clara e instantânea do saldo atual e das transações recentes, facilitando o acompanhamento das finanças através de limites previamente estabelecidos, com a interface fluída e acessível em toda sua utilização.</p>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-s2">
                    <li className="text-xl font-medium">Controle Financeiro Simplificado</li>
                    <li className="text-xl font-medium">Gestão de Gastos Eficiente</li>
                    <li className="text-xl font-medium">Experiência de Usuário Aprimorada</li>
                </ul>
            </div>

            <Image src="/dashboard.png" width={480} height={341} alt="Foto do dashboard" className="border border-1 border-primary rounded-lg" />
        </section>
    );
}

export default SummarySection;