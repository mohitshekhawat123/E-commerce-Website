import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageWrapper, { staggerContainer, staggerItem } from '../../components/PageWrapper';

// Heart icon for wishlist
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
);

const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
    </svg>
);

const saleProducts = [
    {
        id: 1,
        name: "Oversized Wool Coat",
        originalPrice: 8999,
        discountedPrice: 4499,
        discount: 50,
        category: "Women",
        image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        fewLeft: true
    },
    {
        id: 2,
        name: "Classic Denim Jacket",
        originalPrice: 3499,
        discountedPrice: 2449,
        discount: 30,
        category: "Men",
        image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        fewLeft: false
    },
    {
        id: 3,
        name: "Leather Chelsea Boots",
        originalPrice: 5999,
        discountedPrice: 4799,
        discount: 20,
        category: "Men",
        image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        fewLeft: true
    },
    {
        id: 4,
        name: "Cashmere Turtleneck",
        originalPrice: 4599,
        discountedPrice: 3219,
        discount: 30,
        category: "Women",
        image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        fewLeft: false
    },
    {
        id: 5,
        name: "Minimalist Leather Tote",
        originalPrice: 4999,
        discountedPrice: 2499,
        discount: 50,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        fewLeft: false
    },
    {
        id: 6,
        name: "Cropped Puffer Jacket",
        originalPrice: 6999,
        discountedPrice: 3499,
        discount: 50,
        category: "Women",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        fewLeft: true
    },
    {
        id: 7,
        name: "Slim Fit Chinos",
        originalPrice: 2499,
        discountedPrice: 1999,
        discount: 20,
        category: "Men",
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        fewLeft: false
    },
    {
        id: 8,
        name: "Silver Link Bracelet",
        originalPrice: 1299,
        discountedPrice: 1169,
        discount: 10,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        fewLeft: false
    }
];

export default function Sale() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDiscount, setSelectedDiscount] = useState('All');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ hours: 48, minutes: 0, seconds: 0 });

    const categories = ['All', 'Men', 'Women', 'Accessories'];
    const discounts = ['All', '10%', '20%', '30%', '50%'];

    // Countdown Timer Logic (UI Only)
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Filtering
    const filteredProducts = saleProducts.filter(product => {
        const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
        const discountMatch = selectedDiscount === 'All' || product.discount === parseInt(selectedDiscount);
        return categoryMatch && discountMatch;
    });

    return (
        <PageWrapper className="min-h-screen bg-[#F9F9F9] text-gray-900 font-sans selection:bg-red-500 selection:text-white pb-16">

            {/* Hero Banner Area */}
            <div className="bg-red-600 text-white w-full py-16 md:py-24 px-4 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] pointer-events-none"></div>
                <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
                    <span className="text-xs font-bold tracking-widest uppercase bg-white text-red-600 px-4 py-1.5 rounded-full mb-6 shadow-sm animate-pulse">
                        Limited Time Only
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 uppercase">
                        SALE — Up to 50% Off
                    </h1>
                    <p className="text-red-100 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-8">
                        Limited time deals on your favorite styles. Grab them before they're gone!
                    </p>

                    {/* Countdown Timer UI */}
                    <div className="flex gap-4 mb-8">
                        <div className="flex flex-col items-center bg-white/10 backdrop-blur-md px-6 py-3 rounded-lg border border-white/20">
                            <span className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
                            <span className="text-xs text-red-100 uppercase tracking-wider">Hours</span>
                        </div>
                        <div className="flex flex-col items-center justify-center font-bold text-2xl">:</div>
                        <div className="flex flex-col items-center bg-white/10 backdrop-blur-md px-6 py-3 rounded-lg border border-white/20">
                            <span className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
                            <span className="text-xs text-red-100 uppercase tracking-wider">Mins</span>
                        </div>
                        <div className="flex flex-col items-center justify-center font-bold text-2xl">:</div>
                        <div className="flex flex-col items-center bg-white/10 backdrop-blur-md px-6 py-3 rounded-lg border border-white/20">
                            <span className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
                            <span className="text-xs text-red-100 uppercase tracking-wider">Secs</span>
                        </div>
                    </div>

                    <button className="px-10 py-4 bg-white text-red-600 text-sm font-bold tracking-wider uppercase rounded-full hover:bg-gray-100 hover:scale-105 transition-all shadow-xl active:scale-95 duration-200">
                        Shop Now
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Mobile Filter Toggle */}
                <div className="flex justify-between items-center mb-6 lg:hidden">
                    <button
                        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                        className="flex items-center gap-2 text-sm font-medium hover:text-red-600 transition-colors"
                    >
                        <FilterIcon />
                        Filters
                    </button>
                    <span className="text-sm font-medium text-gray-500">{filteredProducts.length} Deals</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Sidebar (Filters) */}
                    <aside className={`lg:w-1/4 flex-shrink-0 ${mobileFiltersOpen ? 'block' : 'hidden'} lg:block`}>
                        <div className="sticky top-24 space-y-10">

                            {/* Categories */}
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-black border-b pb-2">Category</h3>
                                <ul className="space-y-3">
                                    {categories.map(category => (
                                        <li key={category}>
                                            <button
                                                onClick={() => setSelectedCategory(category)}
                                                className={`text-sm tracking-wide transition-colors ${selectedCategory === category
                                                    ? 'text-red-600 font-semibold'
                                                    : 'text-gray-500 hover:text-black'
                                                    }`}
                                            >
                                                {category}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Discount Range */}
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-black border-b pb-2">Discount</h3>
                                <ul className="space-y-3">
                                    {discounts.map(discount => (
                                        <li key={discount}>
                                            <button
                                                onClick={() => setSelectedDiscount(discount)}
                                                className={`text-sm tracking-wide flex items-center gap-2 transition-colors ${selectedDiscount === discount
                                                    ? 'text-red-600 font-semibold'
                                                    : 'text-gray-500 hover:text-black'
                                                    }`}
                                            >
                                                <span className={`w-3 h-3 rounded-full border ${selectedDiscount === discount ? 'border-red-600 bg-red-600' : 'border-gray-300'}`}></span>
                                                {discount === 'All' ? 'All Deals' : `${discount} Off`}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </aside>

                    {/* Right Section (Product Grid) */}
                    <main className="lg:w-3/4 flex-1">
                        <div className="hidden lg:flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                            <span className="text-sm font-medium text-gray-500">{filteredProducts.length} Deals</span>
                        </div>

                        {/* Product Grid */}
                        {filteredProducts.length > 0 ? (
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-50px" }}
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
                            >
                                {filteredProducts.map(product => (
                                    <motion.div variants={staggerItem} key={product.id} className="group flex flex-col cursor-pointer pb-2 relative">
                                        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 mb-4 isolate shadow-sm group-hover:shadow-md transition-all duration-300">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                                loading="lazy"
                                            />
                                            {/* Discount Badge */}
                                            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold tracking-wider px-2.5 py-1.5 rounded-md shadow-md z-10">
                                                -{product.discount}%
                                            </div>

                                            {/* Few Left Tag */}
                                            {product.fewLeft && (
                                                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-red-600 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded shadow-sm z-10">
                                                    Only Few Left
                                                </div>
                                            )}

                                            {/* Wishlist Icon */}
                                            <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-red-600 hover:scale-110 shadow-sm z-10">
                                                <HeartIcon />
                                            </button>
                                        </div>

                                        <div className="flex flex-col items-start mt-auto px-1">
                                            <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                                            <h3 className="text-sm font-medium text-black mb-2 leading-tight group-hover:text-red-600 transition-colors line-clamp-1">{product.name}</h3>

                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-sm font-bold text-red-600">
                                                    ₹{product.discountedPrice.toLocaleString('en-IN')}
                                                </span>
                                                <span className="text-xs text-gray-400 line-through">
                                                    ₹{product.originalPrice.toLocaleString('en-IN')}
                                                </span>
                                            </div>
                                        </div>

                                        <button className="w-full bg-black text-white text-sm font-semibold py-3 rounded-lg hover:bg-red-600 transition-colors shadow-sm active:scale-[0.98]">
                                            Add to Cart
                                        </button>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <p className="text-gray-500 text-lg mb-4">No deals available for selected filters.</p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory('All');
                                        setSelectedDiscount('All');
                                    }}
                                    className="text-sm font-semibold text-red-600 border-b-2 border-red-600 pb-0.5 hover:text-red-700 hover:border-red-700 transition-colors"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}

                        {/* Load More Option */}
                        {filteredProducts.length > 0 && (
                            <div className="mt-16 text-center border-t border-gray-100 pt-10">
                                <button className="px-10 py-3.5 bg-white border-2 border-black text-black text-sm font-bold uppercase tracking-wider rounded-full hover:bg-black hover:text-white transition-all duration-300">
                                    Load More Deals
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </PageWrapper>
    );
}
