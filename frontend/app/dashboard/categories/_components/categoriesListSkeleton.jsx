import CategoryCardSkeleton from "../../_components/categoryCardSkeleton";

function CategoriesListSkeleton() {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="flex-1 p-4 w-full overflow-y-scroll">
      <div className="flex flex-col-reverse justify-center md:flex-row-reverse md:flex-wrap-reverse gap-4 2xl:gap-5 w-full">
        {skeletons?.map((index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export default CategoriesListSkeleton;
