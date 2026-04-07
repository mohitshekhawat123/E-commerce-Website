import Product from '../models/Product.js';

// Get products with optional category and subcategory filters
export const getProducts = async (req, res) => {
  try {
    const { category, subcategory } = req.query;
    
    // Build query dynamically
    let query = {};
    if (category) {
      // Allow case-insensitive search
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }
    if (subcategory) {
      query.subcategory = { $regex: new RegExp(`^${subcategory}$`, 'i') };
    }

    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error fetching products' });
  }
};
