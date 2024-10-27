import { Skeleton } from "@/components/ui/skeleton";

function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4 p-2 min-w-full md:min-w-fit md:py-4 md:px-6 md:w-2/3 lg:w-96 bg-white border border-softGray rounded-md drop-shadow w-auto cursor-pointer hover:drop-shadow-lg transition duration-150 ease-out hover:ease-in">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center text-left gap-3">
          <Skeleton className="h-6 md:w-14 md:h-14 rounded-full" />

          <div className="flex flex-col gap-3">
            <Skeleton className="scroll-m-20 pb-1 h-5 w-20 first:mt-0" />
            <Skeleton className="scroll-m-20 h-[18px] w-20" />
          </div>
        </div>
        <Skeleton className="scroll-m-20 h-[18px] w-20" />
      </div>

      <div className="w-full gap-2 flex flex-col">
        <div className="flex justify-between text-sm">
          <div>
            <Skeleton className="h-4 w-20" />
          </div>

          <div>
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        <Skeleton className="h-5 w-full" />
      </div>
    </div>
  );
}

export default CategoryCardSkeleton;
