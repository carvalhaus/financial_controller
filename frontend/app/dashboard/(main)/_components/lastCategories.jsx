import { ScrollArea } from "@/components/ui/scroll-area";
import CategoryCard from "../../_components/categoryCard";

const categories = [
  {
    title: "Alimentação",
    quantity: 15,
    limit: 500,
    spent: 420,
    remaining: 80,
  },
  {
    title: "Transporte",
    quantity: 10,
    limit: 300,
    spent: 250,
    remaining: 50,
  },
  {
    title: "Lazer",
    quantity: 5,
    limit: 200,
    spent: 120,
    remaining: 80,
  },
  {
    title: "Moradia",
    quantity: 1,
    limit: 1200,
    spent: 1000,
    remaining: 200,
  },
  {
    title: "Saúde",
    quantity: 3,
    limit: 400,
    spent: 300,
    remaining: 100,
  },
  {
    title: "Vestuário",
    quantity: 8,
    limit: 350,
    spent: 280,
    remaining: 70,
  },
  {
    title: "Educação",
    quantity: 2,
    limit: 800,
    spent: 600,
    remaining: 200,
  },
  {
    title: "Beleza",
    quantity: 4,
    limit: 150,
    spent: 100,
    remaining: 50,
  },
  {
    title: "Outras",
    quantity: 7,
    limit: 250,
    spent: 180,
    remaining: 70,
  },
];

function LastCategories() {
  return (
    <div className="text-center px-4 py-3 border border-softGray rounded-md">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">
        Últimas categorias
      </h3>

      <ScrollArea className=" h-96">
        <div className="flex flex-col gap-3">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
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
