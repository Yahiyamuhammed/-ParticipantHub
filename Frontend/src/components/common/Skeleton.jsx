// src/components/common/Skeleton.jsx
import React from "react";
import clsx from "clsx";

export default function Skeleton({ className = "" }) {
  return (
    <div className={clsx("animate-pulse bg-gray-200", className)} />
  );
}

// Specialized Layout Skeletons for a premium feel
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-4 border border-gray-100 flex justify-between">
      <div className="space-y-3 w-2/3">
        <Skeleton className="h-5 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded-md" />
      </div>
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="bg-gray-900 rounded-3xl p-6 h-48 flex flex-col justify-end gap-3">
      <Skeleton className="h-3 w-24 bg-gray-700 rounded-md" />
      <Skeleton className="h-8 w-3/4 bg-gray-700 rounded-md" />
      <div className="flex justify-between items-center mt-2">
        <Skeleton className="h-8 w-28 bg-gray-700 rounded-xl" />
        <Skeleton className="h-10 w-24 bg-gray-700 rounded-xl" />
      </div>
    </div>
  );
}