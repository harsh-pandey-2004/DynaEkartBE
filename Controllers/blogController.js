const blog = require("../Models/blogModel");

const AddBlogdata = async (req, res) => {
  try {
    const { title, heading, content, blogimage } = req.body;
    const existingCheck = await blog.findOne({ title });
    if (existingCheck) {
      return res.status(400).json({ message: "This title is alredy Exist" });
    }
    const newBlog = new blog({
      title,
      heading,
      content,
      blogimage,
    });
    await newBlog.save();
    return res.status(200).json({ message: "Blog added successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding blog - " + error.message });
  }
};

const getBlogs = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      message: "Error getting blog - " + error.message,
    });
  }
};

module.exports = AddBlogdata;
