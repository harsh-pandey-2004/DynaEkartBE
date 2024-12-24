const express = require("express");
const router = express.Router();

const AddBlogData = require("../Controllers/blogController");

router.post("/add", AddBlogData);

module.exports = router;
