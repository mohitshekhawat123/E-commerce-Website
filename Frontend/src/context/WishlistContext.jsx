import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import customFetch from '../utils/api';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [toastState, setToastState] = useState({ visible: false, message: "" });

    // Rehydrate Wishlist globally against Express
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const res = await customFetch("/wishlist")
                if (res.ok) {
                    const data = await res.json()
                    if (data.wishlist) {
                        const hydrated = data.wishlist.map(dbItem => {
                            const productRef = MOCK_PRODUCTS.find(p => p.id === parseInt(dbItem.productId))
                            return { ...productRef, id: parseInt(dbItem.productId) }
                        }).filter(item => item.name);
                        setWishlistItems(hydrated);
                    }
                }
            } catch (e) {
                console.error("Failed to load wishlist", e);
            }
        }
        fetchWishlist();
    }, []);

    const showToast = (message) => {
        setToastState({ visible: true, message });
        setTimeout(() => setToastState({ visible: false, message: "" }), 3000);
    };

    const isInWishlist = (productId) => wishlistItems.some(item => item.id === productId);

    const toggleWishlist = async (product) => {
        const exists = isInWishlist(product.id);

        if (exists) {
            setWishlistItems(prev => prev.filter(item => item.id !== product.id));
            showToast(`Removed ${product.name} from wishlist.`);
            customFetch(`/wishlist/remove/${product.id}`, {
                method: "DELETE"
            }).catch(console.error)
        } else {
            setWishlistItems(prev => [...prev, product]);
            showToast(`Added ${product.name} to wishlist.`);
            customFetch(`/wishlist/add`, {
                method: "POST", 
                body: JSON.stringify({ productId: String(product.id) })
            }).catch(console.error)
        }
    };

    const addToWishlist = async (product, skipSync = false) => {
        if (isInWishlist(product.id)) {
            showToast(`${product.name} is already in your wishlist.`);
            return false;
        }
        setWishlistItems(prev => [...prev, product]);
        showToast(`Moved ${product.name} to wishlist.`);

        if (!skipSync) {
            customFetch(`/wishlist/add`, {
                method: "POST",
                body: JSON.stringify({ productId: String(product.id) })
            }).catch(console.error)
        }
        return true;
    };

    const removeFromWishlist = async (productId, productName) => {
        setWishlistItems(prev => prev.filter(item => item.id !== productId));
        if (productName) showToast(`Removed ${productName} from wishlist.`);

        customFetch(`/wishlist/remove/${productId}`, {
            method: "DELETE"
        }).catch(console.error)
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
            {children}

            {toastState.visible && (
                <div
                    className={`fixed top-5 right-5 z-[9999] px-6 py-4 rounded-xl bg-white text-[#111111] font-bold text-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center gap-3 opacity-100 translate-x-0 scale-100`}
                >
                    <div className="p-1.5 bg-red-50 rounded-full">
                        <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                    </div>
                    {toastState.message}
                </div>
            )}
        </WishlistContext.Provider>
    );
};
