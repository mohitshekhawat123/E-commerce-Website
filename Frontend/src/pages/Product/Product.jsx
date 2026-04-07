import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductGallery from './ProductGallery'
import ProductDetails from './ProductDetails'
import { ProductCard } from '@/components/ProductCard'
import { SkeletonProductPage } from '../../components/Skeletons/SkeletonProductPage'

import { MOCK_PRODUCTS } from '../../data/mockProducts';

const Product = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Scroll to top automatically when navigating between products
        window.scrollTo({ top: 0, behavior: "smooth" })

        // Simulate Network Fetch
        setLoading(true)
        setTimeout(() => {
            const foundProduct = MOCK_PRODUCTS.find(p => p.id === parseInt(id))
            setProduct(foundProduct || null)

            // Grab 4 related products randomly (excluding current)
            if (foundProduct) {
                const filtered = MOCK_PRODUCTS.filter(p => p.id !== foundProduct.id)
                setRelatedProducts(filtered.slice(0, 4))
            }
            setLoading(false)
        }, 400) // Small delay for premium feel
    }, [id])

    if (loading) {
        return <SkeletonProductPage />
    }

    // Error / Not Found State
    if (!product) {
        return (
            <div className="min-h-[70vh] bg-[#f8f8f8] flex items-center justify-center p-4">
                <div className="bg-white max-w-lg w-full rounded-3xl p-10 text-center shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold tracking-tight text-[#111111] mb-4">Product Not Found</h2>
                    <p className="text-[#6b7280] mb-8 text-lg">
                        We couldn't find the product you're looking for. It may have been removed or the URL is incorrect.
                    </p>
                    <Button asChild className="h-14 px-8 bg-[#111111] text-white hover:bg-black/90 rounded-xl text-base font-bold active:scale-[0.98] transition-all">
                        <Link to="/products">
                            Go back to shop
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumbs Navigation */}
            <div className="border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-8 max-w-7xl py-4 flex items-center gap-2 text-sm text-[#6b7280] overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <Link to="/" className="hover:text-[#111111] transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <Link to="/products" className="hover:text-[#111111] transition-colors">Shop</Link>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <Link to={`/products?category=${product.category.toLowerCase()}`} className="hover:text-[#111111] transition-colors">{product.category}</Link>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="text-[#111111] font-medium">{product.name}</span>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 max-w-7xl py-8 md:py-12">
                <Button variant="ghost" className="mb-6 -ml-4 text-gray-500 hover:text-[#111111] rounded-full px-4 h-10" asChild>
                    <Link to="/products" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </Link>
                </Button>

                {/* 2-Column Responsive Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Left Column: Image Gallery */}
                    <div className="w-full">
                        <ProductGallery images={product.images} />
                    </div>

                    {/* Right Column: Details & Actions */}
                    <div className="w-full">
                        <ProductDetails product={product} />
                    </div>
                </div>
            </div>

            {/* Related Products Footer Section */}
            <div className="bg-[#f8f8f8] py-16 mt-16">
                <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-[#111111] tracking-tight mb-3">You May Also Like</h2>
                        <p className="text-[#6b7280]">Complete your look with our recommendations.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map(relProduct => (
                            <ProductCard
                                key={relProduct.id}
                                product={{
                                    id: relProduct.id,
                                    name: relProduct.name,
                                    price: relProduct.price,
                                    originalPrice: relProduct.originalPrice,
                                    image: relProduct.images[0],
                                    rating: relProduct.rating,
                                    reviews: relProduct.reviews,
                                    badge: relProduct.badge,
                                    isNew: relProduct.isNew
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Product
