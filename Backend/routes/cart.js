import express from "express";
import { getCart, addToCart, updateCartItem, removeFromCart, moveToWishlist } from "../controllers/cartController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

// Enforce JWT validation globally for cart context routes
router.use(verifyToken);

router.get("/", getCart);
router.post("/add", addToCart);
router.put("/update", updateCartItem);
router.delete("/remove/:productId", removeFromCart);
router.post("/move-to-wishlist", moveToWishlist);

export default router;
