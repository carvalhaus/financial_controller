"use client";

import DashboardsHeader from "../_components/dashboardsHeader";
import react from "react";
import { useApi } from "@/contexts/contextApi";
import ExpensesList from "./_components/expensesList";

function Expenses() {
  const { fetchWithCredentials } = useApi();

  const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}`;

  const [expenses, setExpenses] = react.useState(null);

  const fetchProtectedData = async () => {
    try {
      const protectedData = await fetchWithCredentials(
        `${BASE_URL}/api/protected`
      );

      const expensesResponse = await fetchWithCredentials(
        `${BASE_URL}/api/expenses/${protectedData.userId}`
      );

      setExpenses(expensesResponse.expenses);
    } catch (err) {
      console.error("Erro inesperado:", err.message);
    }
  };

  react.useEffect(() => {
    fetchProtectedData();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <DashboardsHeader
        title={"Despesas"}
        subtitle={"Lista de todas as suas despesas"}
      />

      <ExpensesList
        expenses={expenses}
        fetchProtectedData={fetchProtectedData}
      />
    </div>
  );
}

export default Expenses;
