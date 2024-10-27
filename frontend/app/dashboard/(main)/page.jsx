"use client";

import { useApi } from "@/contexts/contextApi";
import DashboardsHeader from "../_components/dashboardsHeader";
import ActivitiesSection from "./_components/activitiesSection";
import SummarySection from "./_components/summarySection";
import React from "react";
import SummaryExpenses from "./_components/summaryExpenses";

function MainDashboard() {
  const { userData, fetchProtectedData } = useApi();

  React.useEffect(() => {
    fetchProtectedData();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <DashboardsHeader
        title={`Ola, ${userData?.name}`}
        subtitle={"Vamos controlar suas despesas?"}
      />

      <div className="flex-1 flex flex-col items-center md:p-4 px-4 pb-4 overflow-y-scroll">
        <SummarySection userData={userData} />

        <ActivitiesSection userData={userData} />

        <SummaryExpenses userData={userData} />
      </div>
    </div>
  );
}

export default MainDashboard;
