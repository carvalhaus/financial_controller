import DashboardsHeader from "../_components/dashboardsHeader";
import { ExpensesTable } from "../_components/expensesTable";
import ActivitiesSection from "./_components/activitiesSection";

import SummarySection from "./_components/summarySection";

function MainDashboard() {
  return (
    <div className="h-full flex flex-col">
      <DashboardsHeader
        title={"Ola, Johan"}
        subtitle={"Vamos controlar suas despesas?"}
      />
      <div className="flex-1 flex-col p-4">
        <SummarySection />

        <ActivitiesSection />

        <ExpensesTable />
      </div>
    </div>
  );
}

export default MainDashboard;
