import React from "react";

const Skeleton = () => {
  return (
    <div className="animate-pulse flex flex-col gap-1 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {/* Title Skeleton */}
      <div className="h-6 bg-gray-200 rounded w-3/4 dark:bg-gray-600"></div>
      
      {/* Card Count Skeleton */}
      <div className="h-4 bg-gray-200 rounded w-1/4 mt-2 dark:bg-gray-600"></div>
      
      {/* Description Skeleton */}
      <div className="h-4 bg-gray-200 rounded w-full mt-2 dark:bg-gray-600"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mt-2 dark:bg-gray-600"></div>
      
      {/* Author Section Skeleton */}
      <div className="flex gap-2 items-center mt-4">
        <div className="rounded-full bg-gray-200 w-6 h-6 dark:bg-gray-600"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 dark:bg-gray-600"></div>
      </div>
    </div>
  );
};

export default Skeleton;
