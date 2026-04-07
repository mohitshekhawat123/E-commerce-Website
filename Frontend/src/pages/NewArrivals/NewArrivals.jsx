import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageWrapper, { staggerContainer, staggerItem } from '../../components/PageWrapper';

// Icons
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
);

const newProducts = [
    {
        id: 1,
        name: "Textured Knit Polo",
        price: 1499,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tag: "new"
    },
    {
        id: 2,
        name: "Wide Leg Trousers",
        price: 2499,
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tag: "new"
    },
    {
        id: 3,
        name: "Oversized Cotton Blazer",
        price: 3999,
        image: "https://images.unsplash.com/photo-1591369822096-bbc28156168b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tag: "new"
    },
    {
        id: 4,
        name: "Ribbed Midi Dress",
        price: 2899,
        image: "https://images.unsplash.com/photo-1618932260643-fc49ecc1e2c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tag: "new"
    },
    {
        id: 5,
        name: "Leather Crossbody Bag",
        price: 4599,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tag: "new"
    },
    {
        id: 6,
        name: "Chunky Loafers",
        price: 3499,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tag: "new"
    },
    {
        id: 7,
        name: "Silk Blend Scarf",
        price: 999,
        image: "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tag: "new"
    },
    {
        id: 8,
        name: "Minimalist Watch",
        price: 5499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        tag: "new"
    }
];

export default function NewArrivals() {
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState('Newest');

    const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low'];

    const sortedProducts = [...newProducts].sort((a, b) => {
        if (sortBy === 'Price: Low to High') return a.price - b.price;
        if (sortBy === 'Price: High to Low') return b.price - a.price;
        return 0;
    });

    return (
        <PageWrapper className="min-h-screen bg-[#F9F9F9] text-gray-900 font-sans selection:bg-black selection:text-white pb-16">
            {/* Header Section */}
            <div className="px-6 py-16 md:py-24 text-center max-w-4xl mx-auto flex flex-col items-center">
                <span className="text-xs font-bold tracking-widest uppercase bg-black text-white px-4 py-1.5 rounded-full mb-6 shadow-sm">
                    Summer Collection 2026
                </span>
                <h1 className="text-4xl md:text-5xl font-light tracking-tight text-black mb-6">
                    New Arrivals
                </h1>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                    Stay ahead of trends with our latest drops, designed for modern comfort and effortless style.
                </p>
            </div>

            {/* Highlight Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="relative w-full overflow-hidden rounded-2xl bg-black shadow-lg">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="relative px-8 py-20 md:py-28 flex flex-col items-center text-center justify-center z-10">
                        <h2 className="text-3xl md:text-5xl font-medium text-white mb-8 tracking-wide max-w-2xl">
                            Just Landed — Fresh Styles for the Season
                        </h2>
                        <button onClick={() => navigate('/products')} className="px-10 py-4 bg-white text-black text-sm font-semibold tracking-wide rounded-xl hover:bg-gray-100 transition-colors shadow-xl active:scale-95 duration-200 uppercase">
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Sorting & Result Status */}
                <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-100">
                    <span className="text-sm font-medium text-gray-500">{sortedProducts.length} Items</span>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="text-sm bg-transparent border-none font-medium cursor-pointer focus:ring-0 rounded-md hover:bg-gray-100 py-2 px-3 outline-none transition-colors"
                        >
                            {sortOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Product Grid */}
                {sortedProducts.length > 0 ? (
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
                    >
                        {sortedProducts.map(product => (
                            <motion.div variants={staggerItem} key={product.id} className="group flex flex-col cursor-pointer pb-2">
                                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 mb-5 isolate shadow-sm group-hover:shadow-md transition-shadow duration-300">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                        loading="lazy"
                                    />
                                    {/* NEW Badge */}
                                    <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-md z-10">
                                        NEW
                                    </div>
                                    {/* Wishlist Icon */}
                                    <button className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-red-500 hover:scale-110 shadow-sm z-10">
                                        <HeartIcon />
                                    </button>
                                    {/* Quick View Button */}
                                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-10">
                                        <button className="w-full bg-white/95 backdrop-blur-sm text-black text-sm font-semibold py-3.5 rounded-xl hover:bg-black hover:text-white transition-colors shadow-sm duration-300">
                                            Quick View
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-start mt-auto px-1">
                                    <div>
                                        <h3 className="text-base font-medium text-black mb-1.5 leading-tight group-hover:text-gray-600 transition-colors">{product.name}</h3>
                                    </div>
                                    <span className="text-sm font-semibold text-black whitespace-nowrap ml-4">
                                        ₹{product.price.toLocaleString('en-IN')}
                                    </span>
                                </div>

                                <div className="mt-4 px-1 overflow-hidden h-0 group-hover:h-auto group-hover:mt-5 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                                    <button className="w-full bg-black text-white text-sm font-medium py-3.5 rounded-xl hover:bg-gray-800 transition-all shadow-md active:scale-[0.98]">
                                        Add to Cart
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-32 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-lg">No new arrivals at the moment. Check back soon.</p>
                    </div>
                )}

                {/* Load More Option */}
                {sortedProducts.length > 0 && (
                    <div className="mt-20 text-center">
                        <button className="px-12 py-4 bg-white border border-gray-200 text-sm font-semibold tracking-wide rounded-xl hover:border-black hover:bg-black hover:text-white transition-all duration-300 shadow-sm">
                            Load More
                        </button>
                    </div>
                )}

            </div>
        </PageWrapper>
    );
}
