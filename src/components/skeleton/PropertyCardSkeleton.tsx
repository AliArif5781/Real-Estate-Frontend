export const PropertyCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 my-10 animate-pulse">
      <div className="sm:col-span-5 bg-gray-200 rounded-lg overflow-hidden aspect-video">
        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
      </div>

      <div className="sm:col-span-7  px-4 py-3 rounded-lg flex flex-col h-full">
        <div className="flex-grow space-y-3">
          <div className="h-6 bg-gray-200 rounded w-2/5"></div>

          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>

          <div className="h-7 bg-gray-200 rounded w-1/4"></div>

          <div className="flex gap-3 mt-2">
            <div className="h-5 bg-gray-200 rounded-full w-16"></div>
            <div className="h-5 bg-gray-200 rounded-full w-16"></div>
          </div>
        </div>

        <div className="flex justify-between items-center py-3 border-t border-gray-100 mt-2">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-1">
              <div className="h-6 bg-gray-200 rounded w-[100px]"></div>
            </div>

            <div className="inline-flex items-center gap-1">
              <div className="h-6 bg-gray-200 rounded w-[100px]"></div>
            </div>
          </div>

          <div className="inline-flex items-center gap-1">
            <div className="h-5 bg-gray-200 rounded w-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
