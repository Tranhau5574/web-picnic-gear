const Product = require('../Models/ProductModel');


const ProductCtrl = {


    addProduct: async (req, res) => {
        const { name, description, price, image } = req.body;

        try {
            // Check if the product already exists
            const existingProduct = await Product.findOne({ name });
            if (existingProduct) return res.status(400).json({ msg: 'Product already exists' });

            // Create a new product
            const newProduct = new Product({
                name,
                description,
                price,
                image
            });

            // Save the product to the database
            await newProduct.save();

            // Send a response
            res.json({ msg: 'Product added successfully' });

        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },

    viewProduct: async (req, res) => {
        try {
            // Get the product id from the request parameters
            const { id } = req.params;

            // Find the product in the database using the id
            const product = await Product.findById(id);

            // If the product doesn't exist, return a 404 error
            if (!product) {
                return res.status(404).json({ msg: 'Product not found' });
            }

            // If the product exists, return it in the response
            return res.json(product);
        } catch (err) {
            // If there's an error, return a 500 error
            res.status(500).json({ msg: err.message });
        }
    },
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },
    searchProducts: async (req, res) => {
        try {
            const { name } = req.params;
            const products = await Product.find({ name: { $regex: name, $options: 'i' } });
            // const products = await Product.find({ name: new RegExp(name, 'i') });
            res.json(products);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }
}
module.exports = ProductCtrl;