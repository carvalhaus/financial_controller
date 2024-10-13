"use client";

import DashboardsHeader from "../_components/dashboardsHeader";
import { ExpensesTable } from "../_components/expensesTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import react from "react";
import { useApi } from "@/contexts/contextApi";

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
      console.error("Erro inesperado:", err);
      router.push("/login");
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
      <div className="flex-1 flex-col p-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3 text-center">
          Últimos lançamentos
        </h3>

        <ScrollArea className="rounded-md">
          <ExpensesTable
            expenses={expenses}
            fetchProtectedData={fetchProtectedData}
          />
        </ScrollArea>
      </div>
    </div>
  );
}

export default Expenses;
