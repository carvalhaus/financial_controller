import ExpensesChart from "./expensesChart";
import LastCategories from "./lastCategories";

function ActivitiesSection() {
  return (
    <section className="flex justify-evenly min-h-96">
      <ExpensesChart />

      <LastCategories />
    </section>
  );
}

export default ActivitiesSection;
