import ExpensesChart from "./expensesChart";
import ExpensesChartSkeleton from "./expensesChartSkeleton";
import LastCategories from "./lastCategories";
import LastCategoriesSkeleton from "./lastCategoriesSkeleton";

function ActivitiesSection({ userData }) {
  if (!userData) {
    return (
      <section className="flex flex-col items-center lg:flex-row gap-4 py-5 lg:py-8 md:justify-evenly w-full">
        <ExpensesChartSkeleton />
        <LastCategoriesSkeleton />
      </section>
    );
  }

  const { categories, allCategories } = userData;

  return (
    <section className="flex flex-col items-center lg:flex-row gap-4 py-5 lg:py-8 md:justify-evenly w-full">
      <ExpensesChart allCategories={allCategories} />

      <LastCategories categories={categories} />
    </section>
  );
}

export default ActivitiesSection;
