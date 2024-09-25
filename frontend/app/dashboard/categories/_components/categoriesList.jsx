import { categories } from "@/lib/categories";
import CategoryCard from "../../_components/categoryCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddCategory from "./addCategory";

function CategoriesList() {
  return (
    <div className="flex-1 p-4 w-full">
      <div className="flex flex-col justify-center md:flex-row md:flex-wrap gap-4 2xl:gap-5 w-full">
        <AddCategory />

        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            emoji={category.emoji}
            title={category.title}
            quantity={category.quantity}
            limit={category.limit}
            spent={category.spent}
            remaining={category.remaining}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoriesList;
