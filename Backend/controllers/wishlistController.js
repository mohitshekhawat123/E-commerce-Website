import User from "../models/User.js";

export const getWishlist = async (req, res) => {
    try {
        console.log("👉 getWishlist route hit");
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ wishlist: user.wishlist });
    } catch (error) {
        console.log("❌ getWishlist error:", error);
        res.status(500).json({ error: "Failed to fetch wishlist" });
    }
};

export const addToWishlist = async (req, res) => {
    try {
        console.log("👉 addToWishlist route hit");
        console.log("Body received:", req.body);
        const { productId } = req.body;
        const user = await User.findById(req.user.id);

        if (!user.wishlist.some(item => item.productId === String(productId))) {
            user.wishlist.push({ productId: String(productId) });
            await user.save();
            res.json({ wishlist: user.wishlist, message: "Added to wishlist." });
        } else {
            res.json({ wishlist: user.wishlist, message: "Item is already in wishlist." });
        }

    } catch (error) {
        console.log("❌ addToWishlist error:", error);
        res.status(500).json({ error: "Failed to add to wishlist" });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        console.log("👉 removeFromWishlist route hit");
        console.log("Params received:", req.params);
        const { productId } = req.params;
        const user = await User.findById(req.user.id);

        user.wishlist = user.wishlist.filter(item => item.productId !== String(productId));

        await user.save();
        res.json({ wishlist: user.wishlist, message: "Removed from wishlist." });
    } catch (error) {
        console.log("❌ removeFromWishlist error:", error);
        res.status(500).json({ error: "Failed to remove from wishlist" });
    }
};
