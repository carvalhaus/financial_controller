"use client";

import { usePathname } from "next/navigation";
import DashboardsHeader from "../_components/dashboardsHeader";
import { ExpensesTable } from "../_components/expensesTable";
import { ScrollArea } from "@/components/ui/scroll-area";

function Expenses() {
  const pathname = usePathname();

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

        <ScrollArea className="xl:h-[800px] rounded-md">
          <ExpensesTable pathname={pathname} />
        </ScrollArea>
      </div>
    </div>
  );
}

export default Expenses;
