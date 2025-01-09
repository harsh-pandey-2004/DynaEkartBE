const express = require("express");
const {
  addProduct,
  getAllProducts,
  updateProduct,
  getProduct,
  deleteProduct,
  FindByCategory,
} = require("../Controllers/productController");

const router = express.Router();

router.post("/add", addProduct);
router.get("/listproducts", getAllProducts);
router.patch("/update/:id", updateProduct);
router.get("/product/:id", getProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/bycategory", FindByCategory);

module.exports = router;
