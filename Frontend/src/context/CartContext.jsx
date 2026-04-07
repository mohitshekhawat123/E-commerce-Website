import React, { createContext, useContext, useState, useEffect } from 'react'
import { MOCK_PRODUCTS } from '../data/mockProducts'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([])
    const [toastState, setToastState] = useState({ visible: false, message: "" })

    // JWT Token extractor
    const getToken = () => localStorage.getItem("token")

    // Rehydrate state directly from Express via Mongoose
    useEffect(() => {
        const fetchCart = async () => {
            const token = getToken();
            if (!token) return;
            try {
                const res = await fetch("http://localhost:5000/api/cart", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (res.ok) {
                    const data = await res.json()
                    if (data.cart) {
                        const hydratedCart = data.cart.map(dbItem => {
                            const productRef = MOCK_PRODUCTS.find(p => p.id === parseInt(dbItem.productId))
                            return {
                                ...productRef,
                                id: parseInt(dbItem.productId),
                                qty: dbItem.quantity,
                                attributes: dbItem.attributes
                            }
                        }).filter(item => item.name); // strip orphans natively
                        setCartItems(hydratedCart)
                    }
                }
            } catch (e) {
                console.error("Failed to sync Cart from Network", e)
            }
        }
        fetchCart()
    }, [])

    const showToast = (message) => {
        setToastState({ visible: true, message })
        setTimeout(() => setToastState({ visible: false, message: "" }), 3000)
    }

    const addToCart = async (product, quantity = 1, attributes = {}, skipSync = false) => {
        setCartItems(prev => {
            const attrString = JSON.stringify(attributes)
            const existingIndex = prev.findIndex(item =>
                item.id === product.id && JSON.stringify(item.attributes || {}) === attrString
            )
            if (existingIndex >= 0) {
                const newArr = [...prev]
                newArr[existingIndex].qty += quantity
                return newArr
            } else {
                return [...prev, { ...product, qty: quantity, attributes }]
            }
        })
        showToast(`Added ${product.name} to cart.`)

        if (!skipSync) {
            const token = getToken();
            if (token) {
                await fetch("http://localhost:5000/api/cart/add", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                    body: JSON.stringify({ productId: String(product.id), quantity, attributes })
                }).catch(e => console.error("Error syncing cart", e))
            }
        }
    }

    const removeFromCart = async (product, attributes = {}, skipSync = false) => {
        setCartItems(prev => {
            const attrString = JSON.stringify(attributes)
            return prev.filter(item => !(item.id === product.id && JSON.stringify(item.attributes || {}) === attrString))
        })

        if (!skipSync) {
            const token = getToken();
            if (token) {
                await fetch(`http://localhost:5000/api/cart/remove/${product.id}`, {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` }
                }).catch(e => console.error("Error syncing cart removal", e))
            }
        }
    }

    const updateQuantity = async (product, attributes = {}, newQty) => {
        if (newQty < 1) return
        setCartItems(prev => {
            const attrString = JSON.stringify(attributes)
            return prev.map(item => {
                if (item.id === product.id && JSON.stringify(item.attributes || {}) === attrString) {
                    return { ...item, qty: newQty }
                }
                return item
            })
        })

        const token = getToken();
        if (token) {
            await fetch("http://localhost:5000/api/cart/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({ productId: String(product.id), quantity: newQty, attributes })
            }).catch(e => console.error("Error updating qty", e))
        }
    }

    const clearCart = () => setCartItems([])

    const removeUnavailableItems = () => {
        setCartItems(prev => prev.filter(item => item.inStock !== false))
        showToast("Removed unavailable items from cart.")
    }

    const cartTotalItems = cartItems.reduce((acc, item) => item.inStock === false ? acc : acc + item.qty, 0)
    const cartSubtotal = cartItems.reduce((acc, item) => item.inStock === false ? acc : acc + (item.price * item.qty), 0)

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            removeUnavailableItems,
            cartTotalItems,
            cartSubtotal
        }}>
            {children}

            {toastState.visible && (
                <div className="fixed top-5 right-5 z-[9999] bg-[#111111] text-white px-6 py-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.22)] flex items-center gap-3 animate-in fade-in slide-in-from-right-8 zoom-in-95 duration-400 ease-out">
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full shrink-0 shadow-[0_0_8px_#4ade80]" />
                    <p className="font-bold tracking-wide text-sm">{toastState.message}</p>
                </div>
            )}
        </CartContext.Provider>
    )
}
