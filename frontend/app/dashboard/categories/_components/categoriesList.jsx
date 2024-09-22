import { categories } from "@/lib/categories";
import CategoryCard from "../../_components/categoryCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddCategory from "./addCategory";

function CategoriesList() {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="flex flex-wrap gap-3">
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
    </ScrollArea>
  );
}

export default CategoriesList;
