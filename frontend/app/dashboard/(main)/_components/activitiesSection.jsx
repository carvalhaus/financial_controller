import ExpensesChart from "./expensesChart";
import LastCategories from "./lastCategories";

function ActivitiesSection() {
  return (
    <section className="flex justify-evenly max-h-[454px]">
      <ExpensesChart />

      <LastCategories />
    </section>
  );
}

export default ActivitiesSection;
