const user = require("../Models/userModel");
const product = require("../Models/productModel");

const addtoWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const productData = await product.findById(productId);
    if (!productData) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    const id = req.user.id;
    const userData = await user.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    const wishlistData = userData.wishlist;

    const findKey = wishlistData.find(
      (item) => item?.productId?.toString() === productId.toString()
    );
    if (findKey) {
      return res.status(400).json({ message: "Product already in wishlist" });
    } else {
      wishlistData.push({productId: productId});
    }
    await user.findByIdAndUpdate(id, { wishlist: wishlistData }, { new: true });
    res.status(200).json({ message: "Product Added to Wishlist Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const productData = await product.findById(productId);
    if (!productData) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    const id = req.user.id;
    const userData = await user.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    const wishlistData = userData.wishlist;

    const findKey = wishlistData.find((item) => item?.productId?.toString() === productId);
    if (!findKey) {
      return res.status(400).json({ message: "Product not in wishlist" });
    } else {
      const index = wishlistData.indexOf(findKey);
      wishlistData.splice(index, 1);
    }
    await user.findByIdAndUpdate(id, { wishlist: wishlistData }, { new: true });
    res
      .status(200)
      .json({ message: "Product Removed from Wishlist Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error - " + error });
  }
};

const ListWishlist = async (req, res) => {
  try {
    const id = req.user.id;
    const userData = await user
      .findById(id)
      .select("wishlist")
      .populate({ path: "wishlist", select: "-quantity" });
    console.log(userData);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error - " + error });
  }
};

module.exports = { addtoWishlist, removeFromWishlist, ListWishlist };
