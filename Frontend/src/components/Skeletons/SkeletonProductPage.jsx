import React from 'react';

export const SkeletonProductPage = () => {
    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 py-8 md:py-12 mt-10">

                {/* Breadcrumb Skeleton */}
                <div className="w-48 h-4 bg-gray-200 rounded animate-pulse mb-8" />

                <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
                    {/* Left: Images */}
                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                        <div className="w-full aspect-[4/5] bg-gray-200 rounded-3xl animate-pulse" />
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-20 lg:w-24 aspect-[4/5] shrink-0 bg-gray-200 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className="w-full md:w-1/2 flex flex-col pt-2 lg:pt-8">
                        <div className="w-24 h-6 bg-gray-200 rounded-full animate-pulse mb-4" />
                        <div className="w-3/4 h-10 lg:h-12 bg-gray-200 rounded animate-pulse mb-4" />
                        <div className="w-32 h-8 bg-gray-200 rounded animate-pulse mb-6" />

                        <div className="w-full h-24 bg-gray-200 rounded-xl animate-pulse mb-8" />

                        <div className="flex gap-4 mb-10">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="w-14 h-14 rounded-full bg-gray-200 animate-pulse" />
                            ))}
                        </div>

                        <div className="mt-auto flex flex-col sm:flex-row gap-4">
                            <div className="w-full sm:w-[40%] h-14 bg-[#e5e7eb] rounded-2xl animate-pulse" />
                            <div className="w-full sm:w-[60%] h-14 bg-gray-200 rounded-2xl animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
