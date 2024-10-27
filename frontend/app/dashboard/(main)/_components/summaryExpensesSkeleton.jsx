import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

function SummaryExpensesSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center pt-5 lg:pt-0 w-full">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3">
        Últimos lançamentos
      </h3>

      <ScrollArea className="w-full h-52 rounded-md">
        <div className="bg-white border border-softGray rounded-md drop-shadow text-center h-12">
          <Skeleton className="h-full w-full" />
        </div>
      </ScrollArea>
    </div>
  );
}

export default SummaryExpensesSkeleton;
