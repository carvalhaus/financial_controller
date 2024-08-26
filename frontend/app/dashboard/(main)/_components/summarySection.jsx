"use client"

import SummaryCard from "./summaryCard";

const cardIcons = [
    {
        title: "Orçamento total",
        details: "R$ 4000,00",
        icon: "/savings.svg"
    },
    {
        title: "Despesas totais",
        details: "R$ 2400,00",
        icon: "/expenses.svg"
    },
    {
        title: "Categorias",
        details: "4",
        icon: "/categories.svg"
    }
]

function SummarySection() {
    return (
        <section className="p-5 flex justify-evenly">
            {
                cardIcons.map((card, index) => (
                    <SummaryCard key={index} title={card.title} details={card.details} icon={card.icon} />
                ))
            }
        </section>

    );
}

export default SummarySection;