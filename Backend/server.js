import express from "express";
import { connect } from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import authRoutes from "./routes/auth.js";
import cartRoutes from "./routes/cart.js";
import wishlistRoutes from "./routes/wishlist.js";
import productRoutes from "./routes/productRoutes.js";

config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to MongoDB Atlas
connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection failed:", err.message);
  });
