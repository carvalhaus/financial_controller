"use client";

import SummaryCard from "./summaryCard";

function SummarySection({ userData }) {
  function realCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { categories, expenses } = userData;

  const categoriesLength = categories ? categories.length : "0";

  const totalBudget = realCurrency(
    categories.reduce((sum, expense) => sum + expense.amount, 0)
  );

  const totalExpended = realCurrency(
    expenses.reduce((sum, expense) => sum + expense.amount, 0)
  );

  const cardIcons = [
    {
      title: "Orçamento total",
      details: totalBudget,
      icon: "/savings.svg",
    },
    {
      title: "Despesas totais",
      details: totalExpended,
      icon: "/expenses.svg",
    },
    {
      title: "Categorias",
      details: categoriesLength,
      icon: "/categories.svg",
    },
  ];

  return (
    <section className="py-5 flex flex-col md:flex-row gap-4 w-3/4 md:w-full justify-center lg:justify-evenly">
      {cardIcons.map((card, index) => (
        <SummaryCard
          key={index}
          title={card.title}
          details={card.details}
          icon={card.icon}
        />
      ))}
    </section>
  );
}

export default SummarySection;
