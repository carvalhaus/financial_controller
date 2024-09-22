import { ScrollArea } from "@/components/ui/scroll-area";
import CategoryCard from "../../_components/categoryCard";
import { categories } from "@/lib/categories";

function LastCategories() {
  return (
    <div className="text-center px-4 py-3 border border-softGray rounded-md">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">
        Últimas categorias
      </h3>

      <ScrollArea className=" h-80 rounded-md">
        <div className="flex flex-col gap-3">
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
    </div>
  );
}

export default LastCategories;
