import { Skeleton } from "@/components/ui/skeleton";

function SummaryCardSkeleton() {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center text-center p-2 md:py-2 md:px-4 gap-2 xl:gap-4 xl:py-4 xl:px-6 bg-white border border-softGray rounded-md drop-shadow pointer-events-none">
      <div className="flex flex-col gap-3 items-center">
        <Skeleton className="h-6 w-[136px] pb-1" />
        <Skeleton className="h-7 w-[128px]" />
      </div>

      <Skeleton className="w-12 h-12 rounded-full" />
    </div>
  );
}

export default SummaryCardSkeleton;
