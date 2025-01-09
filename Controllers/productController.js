const Product = require("../Models/productModel");

const addProduct = async (req, res) => {
  try {
    const { name, category, description, price, quantity, imageUrl } = req.body;

    const newProduct = new Product({
      name,
      //   sellerId: req.seller.id,
      category,
      description,
      price,
      quantity,
      imageUrl,
    });
    const product = await newProduct.save();
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Error while adding product",
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding product: " + error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "Nothing in Database",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching products: " + error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, description, price, quantity, imageUrl } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, category, description, price, quantity, imageUrl },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }
    return res.send("Product updated successfully");
  } catch (error) {
    return res.status(500).send("Error updating product: " + error.message);
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    //const sellerId = req.seller.id;
    const product = await Product.findById(id).populate({
      path: "sellerId",
      select: "name",
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error - " + err.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).send("Product not found");
    }
    return res.send("Product deleted successfully");
  } catch (error) {
    return res.status(400).send("Error deleting product: " + error.message);
  }
};

const FindByCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const products = await Product.find({ category });
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    return res.status(200).json({
      message: "Products found successfully",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error finding products by category - " + error.message,
    });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  updateProduct,
  getProduct,
  deleteProduct,
  FindByCategory,
};
