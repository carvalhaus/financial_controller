import { ScrollArea } from "@/components/ui/scroll-area";
import { ExpensesTable } from "../../_components/expensesTable";
import SummaryExpensesSkeleton from "../../(main)/_components/summaryExpensesSkeleton";

function ExpensesList({ expenses, fetchProtectedData }) {
  if (!expenses) {
    return <SummaryExpensesSkeleton />;
  }

  return (
    <div className="flex-1 flex-col p-4 overflow-y-scroll">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3 text-center">
        Últimos lançamentos
      </h3>

      {expenses?.length === 0 ? (
        <h4 className="scroll-m-20 text-xl font-medium tracking-tight mb-3 text-center">
          Não há despesas cadastradas pelo usuário!
        </h4>
      ) : (
        <ScrollArea className="rounded-md">
          <ExpensesTable
            expenses={expenses}
            fetchProtectedData={fetchProtectedData}
          />
        </ScrollArea>
      )}
    </div>
  );
}

export default ExpensesList;
