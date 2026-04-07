import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CartItem from './CartItem'
import OrderSummary from './OrderSummary'
import { useCart } from '../../context/CartContext'
import { AlertTriangle } from 'lucide-react'
import { SkeletonCartItem } from '../../components/Skeletons/SkeletonCartItem'
import { useState, useEffect } from 'react'

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, cartSubtotal, removeUnavailableItems } = useCart()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 600)
        return () => clearTimeout(timer)
    }, [])

    const handleUpdateQty = (item, newQty) => updateQuantity(item, item.attributes || {}, newQty)
    const handleRemove = (item) => removeFromCart(item, item.attributes || {})

    const subtotal = cartSubtotal
    const shipping = subtotal > 2000 || subtotal === 0 ? 0 : 150 // Free shipping over 2000
    const tax = subtotal * 0.18 // 18% mock tax

    const hasUnavailableItems = cartItems.some(item => item.inStock === false)

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#f8f8f8] py-12 md:py-20 lg:py-24">
                <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                    <div className="w-48 h-10 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="w-32 h-5 bg-gray-200 rounded animate-pulse mb-10" />

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                        <div className="w-full lg:w-[65%] xl:w-[70%]">
                            {[...Array(2)].map((_, i) => <SkeletonCartItem key={i} />)}
                        </div>
                        <div className="w-full lg:w-[35%] xl:w-[30%] h-64 bg-gray-200 rounded-3xl animate-pulse" />
                    </div>
                </div>
            </div>
        )
    }

    // Empty State Rendering
    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] bg-[#f8f8f8] flex items-center justify-center p-4">
                <div className="bg-white max-w-lg w-full rounded-3xl p-10 text-center shadow-sm border border-gray-100">
                    <div className="w-24 h-24 bg-[#f8f8f8] rounded-full flex items-center justify-center mx-auto mb-6 text-[#111111]">
                        <ShoppingBag className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-[#111111] mb-4">Your cart is empty</h2>
                    <p className="text-[#6b7280] mb-8 text-lg">
                        Looks like you haven't added anything to your cart yet. Discover your next favorite piece today.
                    </p>
                    <Button asChild className="h-14 px-8 bg-[#111111] text-white hover:bg-black/90 rounded-xl text-base font-bold active:scale-[0.98] transition-all">
                        <Link to="/products" className="flex items-center gap-2">
                            Start Shopping <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    // Active Cart Rendering
    return (
        <div className="min-h-screen bg-[#f8f8f8] py-12 md:py-20 lg:py-24">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#111111] mb-2 tracking-tight">Shopping Cart</h1>
                <p className="text-[#6b7280] text-base mb-10"><span className="font-semibold">{cartItems.length} items</span> in your bag.</p>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                    {/* Left Column: Cart Items (70%) */}
                    <div className="w-full lg:w-[65%] xl:w-[70%]">

                        {hasUnavailableItems && (
                            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-800 font-medium">
                                        Some items in your cart are currently unavailable and have not been included in the total.
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={removeUnavailableItems}
                                    className="shrink-0 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700 h-10 rounded-lg text-sm"
                                >
                                    Remove Unavailable
                                </Button>
                            </div>
                        )}

                        {cartItems.map(item => (
                            <CartItem
                                key={`${item.id}-${JSON.stringify(item.attributes || {})}`}
                                item={item}
                                onUpdateQty={handleUpdateQty}
                                onRemove={handleRemove}
                            />
                        ))}
                    </div>

                    {/* Right Column: Order Summary (30%) */}
                    <div className="w-full lg:w-[35%] xl:w-[30%]">
                        <OrderSummary
                            subtotal={subtotal}
                            shipping={shipping}
                            tax={tax}
                            hasUnavailableItems={hasUnavailableItems}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
