export default function Loading() {
  return (
    <div className="w-full pb-8 animate-pulse">
      {/* Top 3-Column Skeleton Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Main Area (2 cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Featured Skeleton */}
            <div className="bg-white border border-[#e5e5e5] rounded-[4px] p-4 flex flex-col gap-3">
              <div className="skeleton h-52 w-full rounded-[2px]" />
              <div className="skeleton h-4 w-24" />
              <div className="skeleton h-6 w-3/4" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-2/3" />
            </div>

            {/* Headline List Skeleton */}
            <div className="bg-white border border-[#e5e5e5] rounded-[4px] p-4 flex flex-col justify-between gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="skeleton h-3 w-16" />
                  <div className="skeleton h-4 w-full" />
                </div>
              ))}
            </div>
          </div>

          {/* 3-Card Grid Skeleton */}
          <div className="mt-4">
            <div className="skeleton h-6 w-36 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-[#e5e5e5] rounded-[4px] overflow-hidden">
                  <div className="skeleton h-32 w-full" />
                  <div className="p-3 flex flex-col gap-2">
                    <div className="skeleton h-3 w-16" />
                    <div className="skeleton h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Most Read Skeleton */}
        <div className="lg:col-span-1 bg-white border border-[#e5e5e5] rounded-[4px] p-4 flex flex-col gap-4">
          <div className="skeleton h-6 w-28" />
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex items-center gap-3 py-1">
              <div className="skeleton h-6 w-6 rounded-full" />
              <div className="skeleton h-4 flex-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
