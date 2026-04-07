import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Filter, Search } from 'lucide-react';
import PageWrapper, { staggerContainer, staggerItem } from '../../components/PageWrapper';
import { ProductCard } from '../../components/ProductCard';
import { SkeletonCard } from '../../components/Skeletons/SkeletonCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductListing() {
  const { category, subcategory } = useParams();
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/products?category=${category}&subcategory=${subcategory}`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error connecting to backend API", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, subcategory]);

  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  return (
    <PageWrapper className="min-h-screen bg-[#F8F8F8] py-12">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-sm font-medium text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2 scrollbar-none">
          <Link to="/" className="hover:text-[#111111] transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
          <Link to="/categories" className="hover:text-[#111111] transition-colors">Categories</Link>
          <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
          <Link to={`/category/${formattedCategory}`} className="hover:text-[#111111] transition-colors">{formattedCategory}</Link>
          <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
          <span className="text-[#111111] font-bold">{subcategory}</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111] mb-2">
              {subcategory}
            </h1>
            <p className="text-gray-500 text-lg">
              Explore our exclusive {subcategory} collection for {formattedCategory}.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              {products.length} Results
            </span>
          </div>
        </div>

        {/* Products Grid */}
        <main className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-full"><SkeletonCard /></div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
            >
              {products.map(product => {
                // Ensure product has expected shape to prevent ProductCard from breaking
                const mappedProduct = {
                    ...product,
                    inStock: true, // provide defaults if backend lacks them
                    sizes: ["S", "M", "L"],
                    colors: ["Black", "White"]
                };
                return (
                  <motion.div variants={staggerItem} key={product._id} className="h-full">
                    <ProductCard product={mappedProduct} />
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center py-32 bg-white rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-[#111111] mb-2">No products found</h3>
              <p className="text-gray-500 max-w-md mx-auto">We couldn't find any products in "{subcategory}" yet.</p>
              <Link to={`/category/${formattedCategory}`} className="mt-8 inline-flex px-8 py-3 bg-[#111111] text-white font-bold rounded-xl hover:bg-gray-900 transition-colors">
                Browse other subcategories
              </Link>
            </div>
          )}
        </main>

      </div>
    </PageWrapper>
  );
}
