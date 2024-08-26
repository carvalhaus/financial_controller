import DashboardsHeader from "../_components/dashboardsHeader";
import ActivitiesSection from "./_components/activitiesSection";

import SummarySection from "./_components/summarySection";

function MainDashboard() {
    return (
        <div className="h-full flex flex-col">
            <DashboardsHeader title={"Ola, Johan"} subtitle={"Vamos controlar suas despesas?"} />
            <div className="flex-1 flex-col p-4">

                <SummarySection />

                <ActivitiesSection />
                <div>1</div>
            </div>
        </div>
    );
}

export default MainDashboard;