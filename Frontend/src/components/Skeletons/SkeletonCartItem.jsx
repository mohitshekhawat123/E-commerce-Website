import React from 'react';

export const SkeletonCartItem = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-50 mb-6">
            {/* Image */}
            <div className="w-full sm:w-32 h-32 shrink-0 bg-gray-200 rounded-xl animate-pulse" />

            {/* Details & Actions */}
            <div className="flex flex-col sm:flex-row justify-between w-full gap-4">

                {/* Details */}
                <div className="flex flex-col flex-1 gap-3 pt-1">
                    <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse" />
                    <div className="flex gap-4">
                        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse mt-auto" />
                </div>

                {/* Price & Controls */}
                <div className="flex flex-col sm:items-end justify-between items-start mt-2 sm:mt-0 pt-1">
                    <div className="w-24 h-7 bg-gray-200 rounded animate-pulse" />

                    <div className="flex items-center gap-4 mt-4 w-full sm:w-auto justify-between">
                        <div className="w-32 h-11 bg-gray-200 rounded-full animate-pulse" />
                        <div className="flex gap-1">
                            <div className="w-11 h-11 bg-gray-200 rounded-full animate-pulse" />
                            <div className="w-11 h-11 bg-gray-200 rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
