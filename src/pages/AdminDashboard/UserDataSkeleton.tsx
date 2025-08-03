export const UserDataSkeleton = () => {
  return (
    <div className="contents">
      {/* First Name Column */}
      <div className="col-span-1 p-3 border-b border-gray-200">
        <div className="flex justify-start items-center gap-3">
          <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Last Name Column */}
      <div className="col-span-2 p-3 border-b border-gray-200 flex items-center">
        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Email Column */}
      <div className="col-span-4 p-3 border-b border-gray-200 flex items-center">
        <div className="h-5 w-[10rem] bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Role Column */}
      <div className="col-span-2 p-3 border-b border-gray-200 flex items-center">
        <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Created At Column */}
      <div className="col-span-2 p-3 border-b border-gray-200 flex items-center">
        <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Actions Column */}
      <div className="col-span-1 p-3 border-b border-gray-200 flex pl-8 items-center">
        <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
};
