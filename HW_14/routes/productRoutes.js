import express from 'express';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    const { name, price, category } = req.body;

    try {
        const product = new Product({ name, price, category })
        await product.save();

        //  Получаем продукт с populate чтобы вернуть название категории
        const populatedProduct = await Product.findById(product._id).populate("category");
        res.status(201).send({
            message: 'Product was created successfully',
            product: populatedProduct
            
        });
        
    } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(400).send({
            message: 'Error creating product',
            error: error.message
        });
    }
});

// Получение всех продуктов с категориями
router.get("/", async (_req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (error) {
    console.error('Error getting products:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Получение продуктов по названию категории
router.get("/category/:categoryName", async (req, res) => {
    const categoryName = req.params.categoryName;
    try {
        const category = await Category.findOne({ name: categoryName });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        const products = await Product.find({ category: category._id }).populate("category");
        res.json(products);
    } catch (error) {
        console.error('Error getting products by category:', error.message);
        res.status(500).json({ error: error.message });
    }
});


export default router;