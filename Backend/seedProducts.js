import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const mockProducts = [
  // MEN
  { name: "Gear 5 Oversized Graphic Tee", price: 1499, category: "Men", subcategory: "T-Shirts", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1887&auto=format&fit=crop", description: "Oversized fit, 100% heavy cotton", rating: 4.8, reviews: 124 },
  { name: "Straw Hat Classic Denim", price: 2899, category: "Men", subcategory: "Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1926&auto=format&fit=crop", description: "Classic straight fit denim", rating: 4.6, reviews: 210 },
  { name: "Sanji's Signature Suit Jacket", price: 4999, category: "Men", subcategory: "Shirts", image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=2080&auto=format&fit=crop", description: "Formal attire for any grand line occasion", rating: 4.5, reviews: 34 },
  { name: "Zoro's Combat Boots", price: 3499, category: "Men", subcategory: "Shoes", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1974&auto=format&fit=crop", description: "Sturdy boots for sword fighting", rating: 4.9, reviews: 88 },
  
  // WOMEN
  { name: "Nami Navigator Crop Top", price: 2499, category: "Women", subcategory: "Tops", image: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=1974&auto=format&fit=crop", description: "Comfortable crop top for hot weather", rating: 5.0, reviews: 84 },
  { name: "Hancock Elegance Dress", price: 5499, category: "Women", subcategory: "Dresses", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop", description: "Premium evening dress", rating: 4.9, reviews: 112 },
  { name: "Robin's Vintage Handbag", price: 2999, category: "Women", subcategory: "Handbags", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=2015&auto=format&fit=crop", description: "Leather handbag with archaeological designs", rating: 4.7, reviews: 65 },

  // CHILDREN
  { name: "Chopper Youth Hoodie", price: 1899, category: "Children", subcategory: "Clothing", image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1972&auto=format&fit=crop", description: "Cute toddler hoodie", rating: 4.9, reviews: 430 },
  { name: "Thousand Sunny Plushi Toy", price: 899, category: "Children", subcategory: "Toys", image: "https://images.unsplash.com/photo-1558066118-bfbe2fbaaa96?q=80&w=1965&auto=format&fit=crop", description: "Soft toy ship", rating: 4.8, reviews: 320 },

  // ACCESSORIES
  { name: "Law's Beanie", price: 899, category: "Accessories", subcategory: "Hats", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=2187&auto=format&fit=crop", description: "Polar tang themed beanie", rating: 4.9, reviews: 430 },
  { name: "Doflamingo Sunglasses", price: 1599, category: "Accessories", subcategory: "Sunglasses", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop", description: "Pink tinted sunglasses", rating: 4.7, reviews: 215 },
  { name: "Log Pose Watch", price: 4199, category: "Accessories", subcategory: "Watches", image: "https://images.unsplash.com/photo-1523275323863-8a30aa0cc0c1?q=80&w=1974&auto=format&fit=crop", description: "Never get lost", rating: 4.6, reviews: 48 }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected for Seeding");

    await Product.deleteMany({});
    console.log("🧹 Cleared existing mock products");

    await Product.insertMany(mockProducts);
    console.log("🌱 Inserted new categorized dummy products");

    process.exit();
  } catch (error) {
    console.error("❌ Seed Error:", error);
    process.exit(1);
  }
};

seedProducts();
