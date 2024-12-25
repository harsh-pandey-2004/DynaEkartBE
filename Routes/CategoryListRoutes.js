const express = require("express");
const router = express.Router();

const {
  addCategory,
  getCategoryList,
  editCategory,
  deleteCategoryItem,
} = require("../Controllers/categoryController");

router.post("/add", addCategory);
router.get("/getitems", getCategoryList);
router.patch("/edit/:id", editCategory);
router.delete("/delete/:id", deleteCategoryItem);

module.exports = router;
