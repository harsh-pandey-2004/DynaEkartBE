const express = require("express");
const router = express.Router();

const {
  AddBlogdata,
  getBlogs,
  deleteBlogItem,
  EditBlogItem,
} = require("../Controllers/blogController");

router.post("/add", AddBlogdata);
router.get("/getblog", getBlogs);
router.patch("/update/:id", EditBlogItem);
router.delete("/delete/:id", deleteBlogItem);

module.exports = router;
