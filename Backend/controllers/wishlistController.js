import User from "../models/User.js";

export const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ wishlist: user.wishlist });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch wishlist" });
    }
};

export const addToWishlist = async (req, res) => {
    try {
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
        res.status(500).json({ error: "Failed to add to wishlist" });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const user = await User.findById(req.user.id);

        user.wishlist = user.wishlist.filter(item => item.productId !== String(productId));

        await user.save();
        res.json({ wishlist: user.wishlist, message: "Removed from wishlist." });
    } catch (error) {
        res.status(500).json({ error: "Failed to remove from wishlist" });
    }
};
