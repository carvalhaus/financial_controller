import { ScrollArea } from "@/components/ui/scroll-area";
import CategoryCardSkeleton from "../../_components/categoryCardSkeleton";

function LastCategoriesSkeleton() {
  const skeletons = [1, 2, 3];
  return (
    <div className="text-center px-4 py-3 border border-softGray rounded-md w-full">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">
        Últimas categorias
      </h3>

      <ScrollArea className=" h-64 xl:h-80 rounded-md">
        <div className="flex flex-col md:items-center gap-3">
          {skeletons.map((index) => (
            <CategoryCardSkeleton key={index} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default LastCategoriesSkeleton;
