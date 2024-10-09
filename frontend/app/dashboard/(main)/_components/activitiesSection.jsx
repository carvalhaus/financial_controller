import ExpensesChart from "./expensesChart";
import LastCategories from "./lastCategories";

function ActivitiesSection({ userData }) {
  if (!userData) {
    return <div>Loading...</div>;
  }

  const { categories, expenses } = userData;

  return (
    <section className="flex flex-col items-center lg:flex-row gap-4 py-5 md:justify-evenly w-full">
      <ExpensesChart categories={categories}/>

      <LastCategories categories={categories} />
    </section>
  );
}

export default ActivitiesSection;
