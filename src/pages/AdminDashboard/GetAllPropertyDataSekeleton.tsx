export const GetAllPropertyDataSekeleton = () => {
  return (
    <div className="contents">
      {/* Property Image and Info */}
      <div className="col-span-4 p-3 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="h-[4rem] w-[6rem] rounded-lg bg-gray-200 animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="flex gap-2">
              <div className="h-3 w-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="col-span-2 p-3 border-b border-gray-200 flex items-center">
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Type */}
      <div className="col-span-1 p-3 border-b border-gray-200 flex items-center">
        <div className="h-6 w-12 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Date */}
      <div className="col-span-2 p-3 border-b border-gray-200 flex items-center">
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Price */}
      <div className="col-span-2 p-3 border-b border-gray-200 flex items-center">
        <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Actions */}
      <div className="col-span-1 p-3 border-b border-gray-200 flex pl-8 items-center">
        <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
};
