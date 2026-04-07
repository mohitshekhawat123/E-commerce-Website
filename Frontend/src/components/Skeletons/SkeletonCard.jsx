import React from 'react';

export const SkeletonCard = () => {
    return (
        <div className="h-full overflow-hidden border border-gray-100 bg-white rounded-2xl shadow-sm">
            {/* Image Skeleton */}
            <div className="relative h-72 sm:h-[350px] w-full bg-gray-200 animate-pulse" />

            {/* Content Skeleton */}
            <div className="p-5 pb-4">
                <div className="flex justify-between items-start mb-2 gap-2">
                    {/* Title */}
                    <div className="w-2/3 h-5 bg-gray-200 rounded animate-pulse" />
                    {/* Price */}
                    <div className="w-16 h-6 bg-gray-200 rounded animate-pulse shrink-0" />
                </div>
                <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse mt-2" />

                {/* Rating */}
                <div className="flex items-center gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-4 h-4 rounded-full bg-gray-200 animate-pulse" />
                    ))}
                    <div className="w-16 h-3 bg-gray-200 rounded animate-pulse ml-2" />
                </div>
            </div>
        </div>
    );
};
