import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import PageWrapper, { staggerContainer, staggerItem } from '../../components/PageWrapper';
import { ProductCard } from '../../components/ProductCard';
import FilterSidebar from '../../components/Shop/FilterSidebar';
import SortDropdown from '../../components/Shop/SortDropdown';
import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SkeletonCard } from '../../components/Skeletons/SkeletonCard';
import { useEffect } from 'react';

import { MOCK_PRODUCTS } from '../../data/mockProducts';

export default function Shop() {
    const [searchParams, setSearchParams] = useSearchParams();
    const urlSearchQuery = searchParams.get('search') || '';

    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [sortBy, setSortBy] = useState('Newest');

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const urlCat = searchParams.get('category');
        if (urlCat) {
            setSelectedCategory(urlCat);
        } else if (!searchParams.has('search')) {
            setSelectedCategory('All');
        }
    }, [searchParams]);

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        setSearchParams(prev => {
            const newParams = new URLSearchParams(prev);
            if (cat === 'All') newParams.delete('category');
            else newParams.set('category', cat);
            return newParams;
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const categories = ['All', 'T-Shirts', 'Hoodies', 'Outerwear', 'Jeans', 'Formal', 'Accessories'];
    const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Popular'];
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', '38', '40', '42', '44', 'One Size'];
    const colors = [
        { name: 'Black', class: 'bg-black' },
        { name: 'White', class: 'bg-white border border-gray-200' },
        { name: 'Blue', class: 'bg-blue-500' },
        { name: 'Navy', class: 'bg-[#000080]' },
        { name: 'Orange', class: 'bg-orange-500' },
        { name: 'Pink', class: 'bg-pink-400' },
        { name: 'Silver', class: 'bg-gray-300' }
    ];

    // Reset filters
    const clearFilters = () => {
        setSelectedCategory('All');
        setPriceRange([0, 10000]);
        setSelectedSizes([]);
        setSelectedColors([]);
        setSearchParams({}); // clear all search params (including category and search)
    };

    const removeSearch = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('search');
        setSearchParams(newParams);
    };

    // Calculate Filtered & Sorted Products
    const processedProducts = useMemo(() => {
        // 1. Search Filter
        let result = MOCK_PRODUCTS.filter(product => {
            if (!urlSearchQuery) return true;
            const q = urlSearchQuery.toLowerCase();
            return product.name.toLowerCase().includes(q) || product.category.toLowerCase().includes(q);
        });

        // 2. Category
        if (selectedCategory !== 'All') {
            result = result.filter(product => product.category === selectedCategory);
        }

        // 3. Price Range
        result = result.filter(product => product.price <= priceRange[1]);

        // 4. Sizes
        if (selectedSizes.length > 0) {
            result = result.filter(product => product.sizes?.some(size => selectedSizes.includes(size)));
        }

        // 5. Colors
        if (selectedColors.length > 0) {
            result = result.filter(product =>
                product.colors?.some(pc =>
                    selectedColors.some(sc => pc.toLowerCase().includes(sc.toLowerCase()))
                )
            );
        }

        // 6. Sorting
        result.sort((a, b) => {
            if (sortBy === 'Price: Low to High') return a.price - b.price;
            if (sortBy === 'Price: High to Low') return b.price - a.price;
            if (sortBy === 'Popular') return (b.reviews || 0) - (a.reviews || 0);
            return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        });

        return result;
    }, [urlSearchQuery, selectedCategory, priceRange, selectedSizes, selectedColors, sortBy]);

    const activeFilterCount = (selectedCategory !== 'All' ? 1 : 0) + (priceRange[1] < 10000 ? 1 : 0) + selectedSizes.length + selectedColors.length + (urlSearchQuery ? 1 : 0);

    return (
        <PageWrapper className="min-h-screen bg-[#F8F8F8] text-gray-900 font-sans selection:bg-black selection:text-white">

            {/* Header Section */}
            <div className="px-6 py-12 md:py-20 text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111] mb-6">
                    {urlSearchQuery ? `Search Results for "${urlSearchQuery}"` : 'Shop Our Collection'}
                </h1>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                    Discover premium anime streetwear engineered for everyday comfort and bold expression.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

                {/* Active Filter Chips */}
                <AnimatePresence>
                    {activeFilterCount > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                            className="flex flex-wrap items-center gap-3 mb-8 bg-white p-5 rounded-2xl shadow-sm border border-gray-100"
                        >
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">Active Filters:</span>

                            {urlSearchQuery && (
                                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-bold border border-blue-100 shadow-sm transition-all hover:shadow-md">
                                    Search: {urlSearchQuery}
                                    <button onClick={removeSearch} className="hover:bg-blue-200 rounded-full p-1 transition-colors"><X className="w-3 h-3" /></button>
                                </span>
                            )}

                            {selectedCategory !== 'All' && (
                                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 text-[#111111] text-sm font-bold border border-gray-200 shadow-sm transition-all hover:shadow-md">
                                    Cat: {selectedCategory}
                                    <button onClick={() => handleCategoryChange('All')} className="hover:bg-gray-200 rounded-full p-1 transition-colors"><X className="w-3 h-3" /></button>
                                </span>
                            )}

                            {priceRange[1] < 10000 && (
                                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 text-[#111111] text-sm font-bold border border-gray-200 shadow-sm transition-all hover:shadow-md">
                                    Under ₹{priceRange[1]}
                                    <button onClick={() => setPriceRange([0, 10000])} className="hover:bg-gray-200 rounded-full p-1 transition-colors"><X className="w-3 h-3" /></button>
                                </span>
                            )}

                            {selectedSizes.map(size => (
                                <span key={size} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 text-[#111111] text-sm font-bold border border-gray-200 shadow-sm transition-all hover:shadow-md">
                                    Size: {size}
                                    <button onClick={() => setSelectedSizes(prev => prev.filter(s => s !== size))} className="hover:bg-gray-200 rounded-full p-1 transition-colors"><X className="w-3 h-3" /></button>
                                </span>
                            ))}

                            {selectedColors.map(color => (
                                <span key={color} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 text-[#111111] text-sm font-bold border border-gray-200 shadow-sm transition-all hover:shadow-md">
                                    Color: {color}
                                    <button onClick={() => setSelectedColors(prev => prev.filter(c => c !== color))} className="hover:bg-gray-200 rounded-full p-1 transition-colors"><X className="w-3 h-3" /></button>
                                </span>
                            ))}

                            <button onClick={clearFilters} className="ml-auto text-sm font-bold text-red-500 hover:text-red-700 hover:underline px-4 py-2 rounded-xl transition-colors hover:bg-red-50">
                                Clear All
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Filter Toggle */}
                <div className="flex justify-between items-center mb-8 lg:hidden">
                    <Button
                        variant="outline"
                        onClick={() => setMobileFiltersOpen(true)}
                        className="flex items-center gap-2 rounded-xl border-gray-200 shadow-sm font-bold h-12 px-6"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters {activeFilterCount > 0 && <span className="bg-[#111111] text-white text-xs px-2 py-0.5 rounded-full">{activeFilterCount}</span>}
                    </Button>
                    <SortDropdown sortOptions={sortOptions} sortBy={sortBy} setSortBy={setSortBy} />
                </div>

                <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">

                    {/* Desktop Filter Sidebar Component */}
                    <FilterSidebar
                        categories={categories} selectedCategory={selectedCategory} setSelectedCategory={handleCategoryChange}
                        priceRange={priceRange} setPriceRange={setPriceRange}
                        sizes={sizes} selectedSizes={selectedSizes} setSelectedSizes={setSelectedSizes}
                        colors={colors} selectedColors={selectedColors} setSelectedColors={setSelectedColors}
                        clearFilters={clearFilters}
                        isMobile={false} mobileFiltersOpen={false} setMobileFiltersOpen={() => { }}
                    />

                    {/* Mobile Filters Modal */}
                    <FilterSidebar
                        categories={categories} selectedCategory={selectedCategory} setSelectedCategory={handleCategoryChange}
                        priceRange={priceRange} setPriceRange={setPriceRange}
                        sizes={sizes} selectedSizes={selectedSizes} setSelectedSizes={setSelectedSizes}
                        colors={colors} selectedColors={selectedColors} setSelectedColors={setSelectedColors}
                        clearFilters={clearFilters}
                        isMobile={true} mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen}
                    />

                    {/* Right Section (Product Grid) */}
                    <main className="lg:w-3/4 flex-1">
                        {/* Desktop Sorting & Status */}
                        <div className="hidden lg:flex justify-between items-center mb-8 pb-4 border-b border-gray-200/50">
                            <span className="text-sm font-bold text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                                {processedProducts.length} Results
                            </span>
                            <SortDropdown sortOptions={sortOptions} sortBy={sortBy} setSortBy={setSortBy} />
                        </div>

                        {/* Products Grid */}
                        {isLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="h-full"><SkeletonCard /></div>
                                ))}
                            </div>
                        ) : processedProducts.length > 0 ? (
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate="show"
                                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10"
                            >
                                {processedProducts.map(product => (
                                    <motion.div variants={staggerItem} key={product.id} className="h-full">
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <div className="text-center py-32 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    <X className="w-8 h-8 text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-[#111111] mb-2">No products found</h3>
                                <p className="text-gray-500 mb-8 max-w-md">We couldn't find anything matching your current filters. Try adjusting your search or removing some filters.</p>
                                <Button
                                    onClick={clearFilters}
                                    className="bg-[#111111] text-white hover:bg-gray-800 rounded-xl font-bold px-8 h-12 shadow-lg"
                                >
                                    Clear all filters
                                </Button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </PageWrapper>
    );
}
