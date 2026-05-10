import React from 'react'
import { Trash2, Heart, Plus, Minus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import customFetch from '../../utils/api'

const CartItem = ({ item, onUpdateQty, onRemove }) => {
    const { addToWishlist, isInWishlist } = useWishlist();
    const { removeFromCart } = useCart();
    const isWished = isInWishlist(item.id);

    const handleMoveToWishlist = () => {
        customFetch("/api/cart/move-to-wishlist", {
            method: "POST",
            body: JSON.stringify({ productId: String(item.id) })
        }).catch(console.error);

        const added = addToWishlist(item, true); // skipSync = true
        if (added) {
            removeFromCart(item, item.attributes || {}, true); // skipSync = true
        }
    };

    const isAvailable = item.inStock !== false;

    return (
        <div>
            <div className={`flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl shadow-sm transition duration-300 ${!isAvailable ? 'opacity-50 grayscale select-none' : 'hover:shadow-md'}`}>
                {/* Product Image */}
                <div className="w-full sm:w-32 h-32 shrink-0 bg-[#f8f8f8] rounded-xl overflow-hidden relative group">
                    <img
                        src={item.image}
                        alt={item.name}
                        className={`w-full h-full object-cover object-center transition-transform duration-500 ease-out ${isAvailable ? 'group-hover:scale-105' : 'blur-[2px]'}`}
                    />
                    {!isAvailable && (
                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                            <span className="text-red-600 font-extrabold text-sm tracking-wider uppercase bg-white/90 px-2 py-1 rounded shadow-sm">
                                Out of Stock
                            </span>
                        </div>
                    )}
                </div>

                {/* Product Details & Actions */}
                <div className="flex flex-col sm:flex-row justify-between w-full gap-4">

                    {/* Middle: Details */}
                    <div className="flex flex-col flex-1 justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-[#111111] leading-tight mb-1 hover:text-black/70 transition-colors">
                                <Link to={`/product/${item.id}`}>{item.name}</Link>
                            </h3>

                            <div className="flex gap-4 text-sm text-[#6b7280] mb-3">
                                {item.color && (
                                    <p className="flex items-center gap-1.5">
                                        Color:
                                        <span
                                            className="inline-block w-3.5 h-3.5 rounded-full border border-gray-200"
                                            style={{ backgroundColor: item.colorHex || item.color }}
                                        ></span>
                                    </p>
                                )}
                                {item.size && <p>Size: {item.size}</p>}
                            </div>

                            {item.inStock ? (
                                <p className="text-xs font-semibold text-green-600 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> In Stock
                                </p>
                            ) : (
                                <p className="text-xs font-semibold text-red-500 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Out of Stock
                                </p>
                            )}
                        </div>

                        {/* Added a subtle "Save for Later" conceptual UI hook */}
                        <div className="mt-4 hidden sm:flex items-center gap-2">
                            <button onClick={handleMoveToWishlist} className="text-xs font-medium text-[#6b7280] hover:text-[#111111] transition-colors underline underline-offset-4">
                                Save for Later
                            </button>
                        </div>
                    </div>

                    {/* Right: Price & Controls */}
                    <div className="flex flex-col sm:items-end justify-between items-start mt-2 sm:mt-0">
                        <h3 className="text-xl font-bold text-[#111111]">₹{item.price.toFixed(2)}</h3>

                        <div className="flex items-center gap-4 mt-4 w-full sm:w-auto justify-between">

                            {/* Quantity Selector Modern UI */}
                            <div className="flex items-center border border-gray-200 rounded-full bg-white overflow-hidden shadow-sm h-11">
                                <button
                                    onClick={() => onUpdateQty(item, item.qty - 1)}
                                    disabled={item.qty <= 1 || !isAvailable}
                                    className="w-11 h-11 flex items-center justify-center text-[#111111] hover:bg-[#f8f8f8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className={`w-11 text-center font-semibold text-sm ${!isAvailable ? 'text-gray-400' : 'text-[#111111]'}`}>{item.qty}</span>
                                <button
                                    onClick={() => onUpdateQty(item, item.qty + 1)}
                                    disabled={!isAvailable}
                                    className="w-11 h-11 flex items-center justify-center text-[#111111] hover:bg-[#f8f8f8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    title="Move to Wishlist"
                                    onClick={handleMoveToWishlist}
                                    className={`h-11 px-4 lg:px-0 lg:w-11 text-sm lg:text-transparent flex items-center lg:justify-center gap-2 rounded-xl lg:rounded-full transition-colors active:scale-95 \${isWished ? 'text-red-500 hover:text-red-600 bg-red-50' : 'text-[#6b7280] hover:text-[#111111] hover:bg-gray-100 lg:hover:bg-gray-100 lg:hover:text-[#111111]'} font-semibold`}
                                >
                                    <Heart className={`w-5 h-5 shrink-0 \${isWished ? 'fill-current' : ''}`} />
                                    <span className="lg:sr-only text-[#111111] lg:text-transparent">Move to Wishlist</span>
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => onRemove(item)} className="h-11 w-11 text-[#6b7280] hover:text-[#111111] hover:bg-gray-100 rounded-full transition-colors active:scale-95">
                                    <Trash2 className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="border-gray-100 my-6 last:hidden" />
        </div>
    )
}

export default CartItem
