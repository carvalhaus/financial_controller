import { ScrollArea } from "@/components/ui/scroll-area";
import { ExpensesTable } from "../../_components/expensesTable";
import SummaryExpensesSkeleton from "./summaryExpensesSkeleton";

function SummaryExpenses({ userData }) {
  if (!userData) {
    return <SummaryExpensesSkeleton />;
  }

  return (
    <div className="flex flex-col items-center justify-center pt-5 lg:pt-0 w-full">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">
        Últimos lançamentos
      </h3>

      <ScrollArea className="w-full h-52 rounded-md">
        <ExpensesTable expenses={userData?.expenses} />
      </ScrollArea>
    </div>
  );
}

export default SummaryExpenses;
