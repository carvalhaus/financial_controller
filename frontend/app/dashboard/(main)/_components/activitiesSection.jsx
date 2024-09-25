import ExpensesChart from "./expensesChart";
import LastCategories from "./lastCategories";

function ActivitiesSection() {
  return (
    <section className="flex flex-col items-center md:flex-row gap-4 py-5 md:justify-evenly w-full">
      <ExpensesChart />

      <LastCategories />
    </section>
  );
}

export default ActivitiesSection;
