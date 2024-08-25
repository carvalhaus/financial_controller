import DashboardsHeader from "../_components/dashboardsHeader";

function MainDashboard() {
    return (
        <div className="h-full flex flex-col">
            <DashboardsHeader title={"Ola, Johan"} subtitle={"Vamos controlar suas despesas?"} />
            <h1 className="bg-red-50 flex-1">MAIN</h1>
        </div>
    );
}

export default MainDashboard;