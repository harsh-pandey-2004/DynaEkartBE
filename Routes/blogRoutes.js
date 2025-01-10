const express = require("express");
const router = express.Router();

const {
  AddBlogdata,
  getBlogs,
  getSingleBlog,
  deleteBlogItem,
  EditBlogItem,
} = require("../Controllers/blogController");

router.post("/add", AddBlogdata);
router.get("/listblog", getBlogs);
router.get("/getblog/:id", getSingleBlog);
router.patch("/update/:id", EditBlogItem);
router.delete("/delete/:id", deleteBlogItem);

module.exports = router;
