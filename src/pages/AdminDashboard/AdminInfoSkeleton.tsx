const AdminInfoSkeleton = () => {
  return (
    <div className="hidden md:block text-left min-w-0 max-w-[140px] sm:max-w-[180px]">
      {/* Welcome back text skeleton */}
      <div className="h-3 w-[70px] mb-1 bg-gray-200 rounded-full animate-pulse"></div>

      {/* Name skeleton - maintains truncation appearance */}
      <div className="h-4 w-[120px] bg-gray-300 rounded-full animate-pulse overflow-hidden">
        <div className="h-full w-full bg-gray-300"></div>
      </div>
    </div>
  );
};

export default AdminInfoSkeleton;
