export const PropertyPageListSkeleton = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 max-w-[1500px] mx-auto animate-pulse">
      {/* Left Column - Image Gallery Skeleton */}
      <div className="lg:col-span-8 p-4 md:p-6 flex flex-col gap-4">
        {/* Image Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {/* Main Image */}
          <div className="md:col-span-8 bg-gray-200 rounded-lg aspect-video">
            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 md:grid-cols-1 md:col-span-4 gap-3 md:gap-4 mt-3 md:mt-0 h-full">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg">
                <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
              </div>
            ))}
          </div>
        </div>

        {/* Title Section Skeleton */}
        <div className="w-full grid grid-cols-12 gap-4 p-4 rounded-lg">
          <div className="col-span-12 md:col-span-6 space-y-5">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="flex items-center gap-2">
              {/* <MapPin className="h-4 text-gray-300" /> */}
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-gray-200 rounded-full w-16"></div>
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded-full w-40"></div>
          </div>
          <div className="col-span-6 md:col-span-6 flex items-center justify-end">
            <div className="flex items-center gap-3 bg-gray-200 px-4 py-2 rounded-full">
              <div className="h-8 w-8 rounded-full bg-gray-300"></div>
              <div className="h-4 bg-gray-300 rounded w-20"></div>
            </div>
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="px-5 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>

      {/* Right Column - Content Skeleton */}
      <div className="lg:col-span-4 p-4 md:p-6 bg-gray-50 rounded-lg space-y-6">
        {/* General Section */}
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>

        {/* Policies Skeleton */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 p-3 bg-gray-200 rounded-lg">
                  <div className="h-5 w-5"></div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sizes Skeleton */}
        <div className="p-4 rounded-lg shadow-sm bg-white">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="py-3 bg-gray-100 rounded-md flex items-center justify-center gap-4"
              ></div>
            ))}
          </div>
        </div>

        {/* Triple Crisis Skeleton */}
        <div className="p-4 rounded-lg shadow-sm bg-white">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="py-5 bg-gray-100 rounded-md flex items-center justify-center gap-4"
              ></div>
            ))}
          </div>
        </div>

        {/* Global Positioning Skeleton */}
        <div className="p-4 rounded-lg shadow-sm bg-white">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="py-5 bg-gray-100 rounded-md flex items-center justify-center gap-4"
              ></div>
            ))}
          </div>
        </div>

        {/* Nearby Places Skeleton */}
        <div className="p-3 rounded-lg bg-white">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="flex justify-between items-center p-3 bg-gray-100 rounded-lg">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                <div>
                  <div className="h-3 bg-gray-300 rounded w-12 mb-1"></div>
                  <div className="h-2 bg-gray-300 rounded w-8"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
