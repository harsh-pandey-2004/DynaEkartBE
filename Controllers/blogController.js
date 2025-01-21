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
    const blogData = await blog.find();
    if (!blogData) {
      return res.status(404).json({
        success: false,
        message: "No data found in Blog",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data fetched Successfully",
      data: blogData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting blog - " + error.message,
    });
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blogData = await blog.findyId(id);
    if (!blogData) {
      return res.status(404).json({
        success: false,
        message: "No data found in Blog",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Data fetched Successfully",
      data: blogData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting blog - " + error.message,
    });
  }
}

const deleteBlogItem = async (req, res) => {
  try {
    const { id } = req.params;
    const blogItem = await blog.findByIdAndDelete(id);
    if (!blogItem) {
      return res.status(404).json({
        success: false,
        message: "Item is not found",
      });
    }
    return res.json({
      success: true,
      message: "Item is Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error deleting blog item - " + error.message,
    });
  }
};

const EditBlogItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, header, content, blogimage } = req.body;
    const updateItem = await blog.findByIdAndUpdate(id, {
      title,
      header,
      content,
      blogimage,
    });
    if (!updateItem) {
      return res.status(404).json({
        success: false,
        message: "Item is not found",
      });
    }
    await updateItem.save();
    return res.json({
      success: true,
      mesage: "Item Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Edit Blog Item - " + error.message,
    });
  }
};

module.exports = { AddBlogdata, getBlogs, getSingleBlog, EditBlogItem, deleteBlogItem };
