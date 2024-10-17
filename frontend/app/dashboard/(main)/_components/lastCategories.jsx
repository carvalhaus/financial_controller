import { ScrollArea } from "@/components/ui/scroll-area";
import CategoryCard from "../../_components/categoryCard";

function LastCategories({ categories }) {
  return (
    <div className="text-center px-4 py-3 border border-softGray rounded-md w-full">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">
        Últimas categorias
      </h3>

      <ScrollArea className=" h-64 xl:h-80 rounded-md">
        <div className="flex flex-col md:items-center gap-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              icon={category.icon}
              name={category.name}
              totalExpenses={category._count.Expense}
              amount={category.amount}
              totalSpent={category.totalSpent}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default LastCategories;
