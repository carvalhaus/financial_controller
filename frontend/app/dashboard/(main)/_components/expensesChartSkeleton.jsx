import { Skeleton } from "@/components/ui/skeleton";

function ExpensesChartSkeleton() {
  return (
    <div className="text-center px-4 py-3 border border-softGray rounded-md w-full flex flex-col items-center">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">
        Atividades
      </h3>

      <div className="p-4 bg-white border border-softGray rounded-md h-36 lg:h-64 xl:h-80 transition ease-in-out w-full">
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  );
}

export default ExpensesChartSkeleton;
