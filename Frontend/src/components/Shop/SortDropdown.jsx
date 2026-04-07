import React from 'react';

const SortDropdown = ({ sortOptions, sortBy, setSortBy }) => {
    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-500">Sort by:</span>
            <div className="relative">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm bg-white border border-gray-200 shadow-sm font-bold text-[#111111] cursor-pointer focus:ring-2 focus:ring-black focus:border-black rounded-xl hover:bg-gray-50 py-2.5 px-4 pr-8 outline-none transition-all appearance-none"
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                >
                    {sortOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                {/* Custom Chevron icon */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
            </div>
        </div>
    );
};

export default SortDropdown;
