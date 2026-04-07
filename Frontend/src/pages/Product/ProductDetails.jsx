import React, { useState } from 'react'
import { Heart, Minus, Plus, Truck, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

const ProductDetails = ({ product }) => {
    const [qty, setQty] = useState(1)
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null)
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null)

    const { addToCart } = useCart()
    const { toggleWishlist, isInWishlist } = useWishlist()
    const isWished = isInWishlist(product.id)

    const handleQtyChange = (type) => {
        if (type === 'inc') setQty(prev => prev + 1)
        if (type === 'dec' && qty > 1) setQty(prev => prev - 1)
    }

    return (
        <div className="flex flex-col h-full lg:pl-4 xl:pl-8 py-4 lg:py-0">

            {/* Badges / Status */}
            <div className="flex items-center gap-3 mb-4 text-xs font-bold tracking-wider uppercase">
                {product.tag && (
                    <span className="bg-red-50 text-red-600 px-2 py-1 rounded-md">{product.tag}</span>
                )}
                {product.inStock ? (
                    <span className="text-green-600 flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> In Stock</span>
                ) : (
                    <span className="text-red-500 flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Out of Stock</span>
                )}
            </div>

            {/* Title & Price */}
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#111111] mb-4 tracking-tight leading-tight">
                {product.name}
            </h1>
            <div className="flex items-end gap-3 mb-6">
                <span className="text-2xl font-bold text-[#111111]">₹{product.price.toFixed(2)}</span>
                {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through mb-0.5">₹{product.originalPrice.toFixed(2)}</span>
                )}
            </div>

            {/* Reviews Summary */}
            <div className="flex items-center gap-2 mb-8">
                <div className="flex items-center gap-1 text-yellow-500">
                    {/* Simple static stars for UI dummy mockup */}
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating || 5) ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                    ))}
                </div>
                <span className="text-sm font-medium text-[#6b7280]">
                    {product.rating || "5.0"} ({product.reviews || 0} reviews)
                </span>
            </div>

            {/* Description */}
            <p className="text-base text-[#6b7280] leading-relaxed mb-10">
                {product.description}
            </p>

            {/* Variations: Color */}
            {product.colors && product.colors.length > 0 && (
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-[#111111]">Color: <span className="font-normal text-gray-500 ml-1">{selectedColor}</span></span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {product.colors.map(color => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`px-4 py-2 border rounded-xl text-sm font-medium transition-all active:scale-95 ${selectedColor === color
                                    ? 'border-[#111111] bg-[#111111] text-white shadow-md'
                                    : 'border-gray-200 text-[#111111] hover:bg-[#f8f8f8]'
                                    }`}
                            >
                                {color}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Variations: Size */}
            {product.sizes && product.sizes.length > 0 && (
                <div className="mb-10">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-[#111111]">Size: <span className="font-normal text-gray-500 ml-1">{selectedSize}</span></span>
                        <button className="text-xs font-medium text-gray-500 underline hover:text-[#111111] transition-colors">Size Guide</button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {product.sizes.map(size => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`min-w-[48px] h-12 px-4 border rounded-xl text-sm font-bold transition-all active:scale-95 ${selectedSize === size
                                    ? 'border-[#111111] ring-1 ring-[#111111] text-[#111111] shadow-sm'
                                    : 'border-gray-200 text-[#6b7280] hover:border-gray-400 hover:text-[#111111]'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Add to Cart Array */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full">

                {/* Quantity */}
                <div className="flex items-center justify-between sm:justify-center border border-gray-200 rounded-xl bg-[#f8f8f8] p-1 shadow-sm h-14 shrink-0 w-full sm:w-36 px-2 sm:px-1">
                    <button
                        onClick={() => handleQtyChange('dec')}
                        disabled={qty <= 1}
                        className="w-12 h-12 flex items-center justify-center text-[#111111] hover:bg-white rounded-lg disabled:opacity-50 transition-colors shrink-0"
                    >
                        <Minus className="w-5 h-5" />
                    </button>
                    <span className="flex-1 text-center font-bold text-[#111111] text-lg">{qty}</span>
                    <button
                        onClick={() => handleQtyChange('inc')}
                        className="w-12 h-12 flex items-center justify-center text-[#111111] hover:bg-white rounded-lg transition-colors shrink-0"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>

                {/* Action Buttons Group */}
                <div className="flex gap-4 w-full">
                    {/* Primary Action */}
                    <Button
                        disabled={!product.inStock}
                        onClick={() => addToCart(product, qty, { size: selectedSize, color: selectedColor })}
                        className="flex-1 bg-[#111111] text-white hover:bg-black/90 h-14 rounded-xl font-bold text-base active:scale-[0.98] transition-all shadow-lg shadow-black/10"
                    >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>

                    {/* Wishlist */}
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleWishlist(product)}
                        className={`h-14 w-14 rounded-xl border-gray-200 shrink-0 transition-all active:scale-95 \${isWished ? 'text-red-500 hover:text-red-600 bg-red-50 border-red-200' : 'text-[#6b7280] hover:text-red-500 hover:border-red-500 hover:bg-red-50'}`}
                    >
                        <Heart className={`w-6 h-6 \${isWished ? 'fill-current' : ''}`} />
                    </Button>
                </div>
            </div>

            {/* Trust & Delivery */}
            <div className="mt-auto space-y-4 pt-8 border-t border-gray-100">
                <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-[#111111] shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-[#111111]">Free Standard Delivery</p>
                        <p className="text-xs text-gray-500 mt-1">Delivery in 3–5 business days</p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#111111] shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-[#111111]">30 Days Return Policy</p>
                        <p className="text-xs text-gray-500 mt-1">Return your item within 30 days hassle-free.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductDetails
