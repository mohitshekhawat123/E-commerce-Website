import express from "express";
import { getWishlist, addToWishlist, removeFromWishlist } from "../controllers/wishlistController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

// Enforce JWT validation globally against wishlist mutations
router.use(verifyToken);

router.get("/", getWishlist);
router.post("/add", addToWishlist);
router.delete("/remove/:productId", removeFromWishlist);

export default router;
