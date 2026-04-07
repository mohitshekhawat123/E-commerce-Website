import React from 'react';
import { Link } from "react-router-dom"
import { ShoppingCart, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AnimatedButtonWrapper } from "./Animations"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"

export function WishlistCard({ product }) {
    const { addToCart } = useCart()
    const { removeFromWishlist } = useWishlist()

    const handleMoveToCart = (e) => {
        e.preventDefault();
        addToCart(product, 1, { size: product.sizes?.[0] || "M" })
        removeFromWishlist(product.id, product.name);
    }

    return (
        <Card className="h-full overflow-hidden group border border-gray-100 bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="p-0 relative h-72 sm:h-[350px] overflow-hidden bg-[#f8f8f8]">
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {product.badge && (
                        <Badge variant={product.badge === "Sale" ? "destructive" : "default"} className="px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-md">
                            {product.badge}
                        </Badge>
                    )}
                    {product.isNew && <Badge variant="secondary" className="bg-white text-black px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-md">New</Badge>}
                    {product.inStock === false && <Badge variant="destructive" className="px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-md">Out of Stock</Badge>}
                </div>

                {/* Remove Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => { e.preventDefault(); removeFromWishlist(product.id, product.name); }}
                    className="absolute top-4 right-4 z-20 rounded-full h-10 w-10 bg-white/70 backdrop-blur-md opacity-0 group-hover:opacity-100 text-[#6b7280] hover:text-[#111111] hover:bg-white transition-all duration-300 shadow-sm hover:scale-110"
                >
                    <Trash2 className="h-5 w-5" />
                    <span className="sr-only">Remove from Wishlist</span>
                </Button>

                {/* Move to Cart overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-0 opacity-100 lg:translate-y-full lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-300 z-10 bg-gradient-to-t from-[#111111]/70 lg:from-[#111111]/60 to-transparent flex justify-center">
                    <AnimatedButtonWrapper className="w-full">
                        <Button
                            disabled={product.inStock === false}
                            onClick={handleMoveToCart}
                            className="w-full gap-2 font-semibold shadow-lg bg-white text-[#111111] hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            {product.inStock === false ? 'Out of Stock' : 'Move to Cart'}
                        </Button>
                    </AnimatedButtonWrapper>
                </div>

                {/* Image */}
                <Link to={`/product/${product.id}`} className="block w-full h-full">
                    <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out \${product.inStock === false ? 'grayscale blur-[2px] opacity-70' : ''}`}
                    />
                </Link>
            </CardHeader>

            <CardContent className="p-5 pb-4">
                <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="font-semibold text-lg line-clamp-2 leading-tight text-[#111111] group-hover:text-black/70 transition-colors">
                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </h3>
                    <div className="flex flex-col items-end shrink-0">
                        <span className="font-bold text-lg text-[#111111]">₹{product.price}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
