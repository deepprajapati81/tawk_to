"use client";

import { Card } from "@/components/ui/card";

export const WidgetSkeletonShimmer = () => {
  return (
    <Card className="xl:w-[80%] md:w-[70%] w-full max-w-lg h-130 rounded-xl flex flex-col overflow-hidden shadow-lg relative">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/20 to-transparent"></div>

      {/* Header Skeleton */}
      <div className="flex items-center px-4 py-3 bg-linear-to-r from-gray-300 to-gray-200">
        <div className="w-6 h-6 bg-gray-400/50 rounded animate-pulse"></div>
        <div className="ml-2 w-32 h-5 bg-gray-400/50 rounded animate-pulse"></div>
      </div>

      {/* Messages Area Skeleton */}
      <div className="flex-1 px-3 py-4 space-y-3 bg-white">
        {/* Bot message with shimmer */}
        <div className="relative overflow-hidden">
          <div className="w-3/4 h-12 bg-gray-200 rounded-md"></div>
          <div className="absolute inset-0 -translate-x-full animate-shimmer-fast bg-linear-to-r from-transparent via-white/40 to-transparent"></div>
        </div>

        {/* Suggestions */}
        <div className="flex flex-col items-end space-y-2">
          <div className="relative overflow-hidden">
            <div className="w-48 h-10 bg-gray-200 rounded-md"></div>
            <div
              className="absolute inset-0 -translate-x-full animate-shimmer-fast bg-linear-to-r from-transparent via-white/40 to-transparent"
              style={{ animationDelay: "0.1s" }}
            ></div>
          </div>
          <div className="relative overflow-hidden">
            <div className="w-40 h-10 bg-gray-200 rounded-md"></div>
            <div
              className="absolute inset-0 -translate-x-full animate-shimmer-fast bg-linear-to-r from-transparent via-white/40 to-transparent"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>

        {/* User messages */}
        <div className="flex flex-col items-end space-y-2 mt-4">
          <div className="relative overflow-hidden">
            <div className="w-56 h-10 bg-gray-200 rounded-md"></div>
            <div
              className="absolute inset-0 -translate-x-full animate-shimmer-fast bg-linear-to-r from-transparent via-white/40 to-transparent"
              style={{ animationDelay: "0.3s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Input Footer Skeleton */}
      <div className="p-3 flex gap-2 items-center bg-gray-100 border-t border-gray-200">
        <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="w-16 h-10 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </Card>
  );
};
