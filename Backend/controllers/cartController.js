import User from "../models/User.js";

export const getCart = async (req, res) => {
    try {
        console.log("👉 getCart route hit");
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ cart: user.cart });
    } catch (error) {
        console.log("❌ getCart error:", error);
        res.status(500).json({ error: "Failed to fetch cart" });
    }
};

export const addToCart = async (req, res) => {
    try {
        console.log("👉 addToCart route hit");
        console.log("Body received:", req.body);
        const { productId, quantity = 1, attributes = {} } = req.body;
        const user = await User.findById(req.user.id);

        const attrString = JSON.stringify(attributes);
        const existingItem = user.cart.find(
            item => item.productId === String(productId) && JSON.stringify(item.attributes || {}) === attrString
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            user.cart.push({ productId: String(productId), quantity, attributes });
        }

        await user.save();
        res.json({ cart: user.cart, message: "Item added to cart successfully." });
    } catch (error) {
        console.log("❌ addToCart error:", error);
        res.status(500).json({ error: "Failed to add to cart" });
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const { productId, quantity, attributes = {} } = req.body;
        if (quantity < 1) return res.status(400).json({ error: "Quantity must be at least 1" });

        const user = await User.findById(req.user.id);
        const attrString = JSON.stringify(attributes);
        const item = user.cart.find(
            item => item.productId === String(productId) && JSON.stringify(item.attributes || {}) === attrString
        );

        if (item) {
            item.quantity = quantity;
            await user.save();
        }
        res.json({ cart: user.cart });
    } catch (error) {
        res.status(500).json({ error: "Failed to update cart" });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        console.log("👉 removeFromCart route hit");
        console.log("Params received:", req.params);
        const { productId } = req.params;
        const user = await User.findById(req.user.id);

        user.cart = user.cart.filter(item => item.productId !== String(productId));

        await user.save();
        res.json({ cart: user.cart, message: "Removed from cart." });
    } catch (error) {
        console.log("❌ removeFromCart error:", error);
        res.status(500).json({ error: "Failed to remove from cart" });
    }
};

export const moveToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await User.findById(req.user.id);

        // 1. Remove from cart
        user.cart = user.cart.filter(item => item.productId !== String(productId));

        // 2. Add to wishlist natively guaranteeing zero-dupes
        if (!user.wishlist.some(item => item.productId === String(productId))) {
            user.wishlist.push({ productId: String(productId) });
        }

        await user.save();
        res.json({ cart: user.cart, wishlist: user.wishlist, message: "Moved item to wishlist." });
    } catch (error) {
        res.status(500).json({ error: "Failed to move item to wishlist" });
    }
};
