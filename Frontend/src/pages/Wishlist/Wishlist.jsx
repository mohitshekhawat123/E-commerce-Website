import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageWrapper, { staggerContainer, staggerItem } from '../../components/PageWrapper';
import { WishlistCard } from '../../components/WishlistCard';
import { useWishlist } from '../../context/WishlistContext';
import { Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Wishlist = () => {
    const { wishlistItems } = useWishlist();

    return (
        <PageWrapper className="min-h-screen bg-[#F8F8F8] text-gray-900 font-sans selection:bg-black selection:text-white">

            {/* Header Section */}
            <div className="px-6 py-12 md:py-20 text-center max-w-4xl mx-auto border-b border-gray-200/50">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-red-500 fill-current" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111] mb-6">
                    Your Wishlist
                </h1>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                    {wishlistItems.length > 0
                        ? `You have \${wishlistItems.length} \${wishlistItems.length === 1 ? 'item' : 'items'} saved for later.`
                        : "Keep track of the pieces you love. They'll be waiting here until you're ready."}
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {wishlistItems.length > 0 ? (
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
                    >
                        <AnimatePresence>
                            {wishlistItems.map((product) => (
                                <motion.div
                                    variants={staggerItem}
                                    key={product.id}
                                    className="h-full"
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                >
                                    <WishlistCard product={product} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center max-w-2xl mx-auto"
                    >
                        <Heart className="w-12 h-12 text-gray-200 mb-6" />
                        <h3 className="text-2xl font-extrabold text-[#111111] mb-3">Your wishlist is empty</h3>
                        <p className="text-gray-500 mb-10 max-w-sm">
                            Browse our collection and tap the heart icon to save your favorite items here.
                        </p>
                        <Button
                            asChild
                            className="bg-[#111111] text-white hover:bg-gray-800 rounded-xl font-bold px-10 h-14 shadow-lg text-base flex items-center gap-2 group"
                        >
                            <Link to="/products">
                                Start Shopping
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </motion.div>
                )}

            </div>
        </PageWrapper>
    );
};

export default Wishlist;
