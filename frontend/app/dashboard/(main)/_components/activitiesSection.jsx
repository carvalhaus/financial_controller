import ExpensesChart from "./expensesChart";
import LastCategories from "./lastCategories";


function ActivitiesSection() {
    return (
        <section className="flex gap-10">
            <ExpensesChart />

            <LastCategories />
        </section>
    );
}

export default ActivitiesSection;