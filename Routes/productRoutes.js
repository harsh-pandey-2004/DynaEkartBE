const express = require("express");
const {
  addProduct,
  getAllProducts,
  updateProduct,
  getProduct,
  deleteProduct,
} = require("../Controllers/productController");
// const { authenticateSeller } = require("../middleware/auth");

const router = express.Router();

router.post("/add", addProduct);
router.get("/listproducts", getAllProducts);
router.patch("/update/:id", updateProduct);
router.get("/product/:id", getProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
