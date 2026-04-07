import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FilterSidebar = ({
    categories, selectedCategory, setSelectedCategory,
    priceRange, setPriceRange,
    sizes, selectedSizes, setSelectedSizes,
    colors, selectedColors, setSelectedColors,
    clearFilters,
    isMobile, mobileFiltersOpen, setMobileFiltersOpen
}) => {

    const toggleSize = (size) => {
        if (selectedSizes.includes(size)) setSelectedSizes(prev => prev.filter(s => s !== size));
        else setSelectedSizes(prev => [...prev, size]);
    };

    const toggleColor = (color) => {
        if (selectedColors.includes(color)) setSelectedColors(prev => prev.filter(c => c !== color));
        else setSelectedColors(prev => [...prev, color]);
    };

    const content = (
        <div className="space-y-10 pb-10">
            <div className="flex justify-between items-center lg:hidden mb-6">
                <h2 className="text-2xl font-bold text-[#111111]">Filters</h2>
                <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Categories */}
            <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-[#111111]">Category</h3>
                <ul className="space-y-3">
                    {categories.map(category => (
                        <li key={category}>
                            <button
                                onClick={() => setSelectedCategory(category)}
                                className={`text-base font-medium transition-all duration-200 ${selectedCategory === category
                                    ? 'text-[#111111] translate-x-1'
                                    : 'text-gray-500 hover:text-[#111111] hover:translate-x-1'
                                    }`}
                            >
                                {category}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-[#111111]">Max Price: ₹{priceRange[1]}</h3>
                <div className="space-y-4">
                    <input
                        type="range"
                        className="w-full accent-[#111111] cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none"
                        min="0" max="10000" step="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    />
                    <div className="flex justify-between text-xs text-gray-500 font-bold">
                        <span>₹0</span>
                        <span>₹10,000+</span>
                    </div>
                </div>
            </div>

            {/* Size */}
            <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-[#111111]">Size</h3>
                <div className="grid grid-cols-4 gap-2.5">
                    {sizes.map(size => (
                        <button
                            key={size}
                            onClick={() => toggleSize(size)}
                            className={`border font-semibold text-sm py-2.5 rounded-xl transition-all duration-200 ${selectedSizes.includes(size)
                                    ? 'border-[#111111] bg-[#111111] text-white shadow-md'
                                    : 'border-gray-200 text-gray-700 hover:border-[#111111] hover:bg-gray-50'
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Colors */}
            <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-[#111111]">Color</h3>
                <div className="flex flex-wrap gap-3">
                    {colors.map(color => (
                        <button
                            key={color.name}
                            onClick={() => toggleColor(color.name)}
                            className={`w-9 h-9 rounded-full ${color.class} ring-2 ring-offset-2 transition-all duration-200 shadow-sm ${selectedColors.includes(color.name) ? 'ring-[#111111] scale-110' : 'ring-transparent hover:ring-gray-300 hover:scale-110'
                                }`}
                            title={color.name}
                            aria-label={color.name}
                        />
                    ))}
                </div>
            </div>

            {/* Clear Filters */}
            <div className="pt-6 border-t border-gray-100">
                <Button
                    variant="outline"
                    className="w-full rounded-xl border-gray-200 hover:bg-gray-50 text-gray-900 font-bold h-12"
                    onClick={clearFilters}
                >
                    Clear All Filters
                </Button>
            </div>
        </div>
    );

    if (isMobile) {
        return (
            <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${mobileFiltersOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                {/* Backdrop Layer */}
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={() => setMobileFiltersOpen(false)}
                />
                {/* Drawer */}
                <div className={`absolute top-0 right-0 w-[85%] max-w-[360px] h-full bg-white shadow-2xl p-6 overflow-y-auto transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${mobileFiltersOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    {content}
                </div>
            </div>
        );
    }

    return (
        <aside className="lg:w-1/4 flex-shrink-0 hidden lg:block bg-white p-6 rounded-3xl shadow-sm border border-gray-100/50">
            <div className="sticky top-24">
                {content}
            </div>
        </aside>
    );
};

export default FilterSidebar;
