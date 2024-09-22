"use client";

import { usePathname } from "next/navigation";
import DashboardsHeader from "../_components/dashboardsHeader";
import { ExpensesTable } from "../_components/expensesTable";
import ActivitiesSection from "./_components/activitiesSection";

import SummarySection from "./_components/summarySection";
import { ScrollArea } from "@/components/ui/scroll-area";

function MainDashboard() {
  const pathname = usePathname();
  return (
    <div className="h-full flex flex-col">
      <DashboardsHeader
        title={"Ola, Johan"}
        subtitle={"Vamos controlar suas despesas?"}
      />
      <div className="flex-1 flex-col p-4">
        <SummarySection />

        <ActivitiesSection />

        <div className="flex flex-col items-center justify-center pt-5">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">
            Últimos lançamentos
          </h3>

          <ScrollArea className="w-full h-60 rounded-md">
            <ExpensesTable pathname={pathname} />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
