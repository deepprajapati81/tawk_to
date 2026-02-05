"use client";

interface CodeBlockSkeletonProps {
  theme?: "light" | "dark";
}

export const CodeBlockSkeleton = ({ theme = "light" }: CodeBlockSkeletonProps) => {
  return (
    <div className="relative group code-block-wrapper">
      <div
        className="rounded-lg border overflow-hidden shadow-sm"
        style={{
          borderColor: theme === "dark" ? "#334155" : "#e5e7eb",
        }}
      >
        {/* Header Skeleton */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b animate-pulse"
          style={{
            background: theme === "dark" ? "#0f172a" : "#ffffff",
            borderColor: theme === "dark" ? "#334155" : "#e5e7eb",
          }}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-gray-300" />
              <div className="w-3 h-3 rounded-full bg-gray-300" />
              <div className="w-3 h-3 rounded-full bg-gray-300" />
            </div>
            <div className="ml-3 w-32 h-4 bg-gray-300 rounded"></div>
          </div>

          <div className="w-20 h-8 bg-gray-200 rounded"></div>
        </div>

        {/* Code Content Skeleton */}
        <div
          className="p-6 space-y-3 animate-pulse"
          style={{
            background: theme === "dark" ? "#1e293b" : "#f8f9fa",
          }}
        >
          <div className="w-full h-4 bg-gray-300 rounded"></div>
          <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
          <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
          <div className="w-4/5 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

// Shimmer version
export const CodeBlockSkeletonShimmer = ({ theme = "light" }: CodeBlockSkeletonProps) => {
  return (
    <div className="relative group code-block-wrapper">
      <div
        className="rounded-lg border overflow-hidden shadow-sm"
        style={{
          borderColor: theme === "dark" ? "#334155" : "#e5e7eb",
        }}
      >
        {/* Header Skeleton */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b relative overflow-hidden"
          style={{
            background: theme === "dark" ? "#0f172a" : "#ffffff",
            borderColor: theme === "dark" ? "#334155" : "#e5e7eb",
          }}
        >
          <div className="flex items-center gap-2 z-10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-gray-300 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-gray-300 animate-pulse" style={{ animationDelay: '0.1s' }} />
              <div className="w-3 h-3 rounded-full bg-gray-300 animate-pulse" style={{ animationDelay: '0.2s' }} />
            </div>
            <div className="ml-3 w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>

          <div className="w-20 h-8 bg-gray-200 rounded animate-pulse z-10"></div>
          
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
        </div>

        {/* Code Content Skeleton */}
        <div
          className="p-6 space-y-3 relative overflow-hidden"
          style={{
            background: theme === "dark" ? "#1e293b" : "#f8f9fa",
          }}
        >
          <div className="relative">
            <div className="w-full h-4 bg-gray-300 rounded"></div>
            <div className="absolute inset-0 -translate-x-full animate-shimmer-fast bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
          </div>
          <div className="relative">
            <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
            <div className="absolute inset-0 -translate-x-full animate-shimmer-fast bg-linear-to-r from-transparent via-white/30 to-transparent" style={{ animationDelay: '0.1s' }}></div>
          </div>
          <div className="relative">
            <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            <div className="absolute inset-0 -translate-x-full animate-shimmer-fast bg-linear-to-r from-transparent via-white/30 to-transparent" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <div className="relative">
            <div className="w-4/5 h-4 bg-gray-300 rounded"></div>
            <div className="absolute inset-0 -translate-x-full animate-shimmer-fast bg-linear-to-r from-transparent via-white/30 to-transparent" style={{ animationDelay: '0.3s' }}></div>
          </div>

          {/* Overall shimmer overlay */}
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};
