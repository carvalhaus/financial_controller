"use client";

import { useApi } from "@/contexts/contextApi";
import DashboardsHeader from "../_components/dashboardsHeader";
import { ExpensesTable } from "../_components/expensesTable";
import ActivitiesSection from "./_components/activitiesSection";

import SummarySection from "./_components/summarySection";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

function MainDashboard() {
  const { userData, fetchProtectedData } = useApi();

  // );React.useEffect(() => {
  //   fetchProtectedData();
  // }, [fetchProtectedData]

  return (
    <div className="h-full flex flex-col">
      <DashboardsHeader
        title={`Ola, ${userData?.name}`}
        subtitle={"Vamos controlar suas despesas?"}
      />

      <div className="flex-1 flex flex-col items-center md:p-4 px-4 pb-4 overflow-y-scroll">
        <SummarySection userData={userData} />

        <ActivitiesSection userData={userData} />

        <div className="flex flex-col items-center justify-center pt-5 lg:pt-0 w-full">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">
            Últimos lançamentos
          </h3>

          <ScrollArea className="w-full h-52 rounded-md">
            <ExpensesTable expenses={userData?.expenses} />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
