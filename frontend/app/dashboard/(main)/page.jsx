"use client";

import DashboardsHeader from "../_components/dashboardsHeader";
import { ExpensesTable } from "../_components/expensesTable";
import ActivitiesSection from "./_components/activitiesSection";

import SummarySection from "./_components/summarySection";
import { ScrollArea } from "@/components/ui/scroll-area";

function MainDashboard() {
  return (
    <div className="h-full flex flex-col">
      <DashboardsHeader
        title={"Ola, Johan"}
        subtitle={"Vamos controlar suas despesas?"}
      />

      <div className="flex-1 flex flex-col items-center md:p-4 px-4 pb-4">
        <SummarySection />

        <ActivitiesSection />

        <div className="flex flex-col items-center justify-center pt-5 w-full">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">
            Últimos lançamentos
          </h3>

          <ScrollArea className="w-full h-60 rounded-md">
            <ExpensesTable />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
