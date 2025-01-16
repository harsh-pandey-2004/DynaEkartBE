const category = require("../Models/categoryModel");

const addCategory = async (req, res) => {
  try {
    const { name, link, categorylogo } = req.body;
    const existingCheck = await category.findOne({ name });
    if (existingCheck) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const newCategory = new category({
      name,
      link,
      categorylogo,
    });
    const saveCategory = await newCategory.save();
    res
      .status(201)
      .json({ message: "Category added successfully", data: saveCategory });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding category - " + error.message,
    });
  }
};

const getCategoryList = async (req, res) => {
  try {
    const categoryData = await category.find();
    if (!categoryData) {
      return res.status(404).json({ message: "Category data not Found" });
    }
    return res.status(200).json({
      success: true,
      data: categoryData,
      message: "Data Fetched Succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error fetching category list - " + error.message,
    });
  }
};
const getSingleCategoryList = async (req, res) => {
  try {
    const categoryId = req.params.id; 
    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const categoryData = await category.findById(categoryId); 
    if (!categoryData) {
      return res.status(404).json({ message: "Single Category data not Found" });
    }

    return res.status(200).json({
      success: true,
      data: categoryData,
      message: "Data Fetched Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error fetching Single category list - " + error.message,
    });
  }
};


const editCategory = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { name, link, categorylogo } = req.body;
    const checkItemData = await category.findByIdAndUpdate(
      itemId,
      { name, link, categorylogo },
      { new: true }
    );
    if (!checkItemData) {
      return res.status(404).json({
        success: false,
        message: "Category Item is not Found",
      });
    }
    return res.status(200).json({
      success: true,
      data: checkItemData,
      message: "Item Updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Editing Category - " + error.message,
    });
  }
};

const deleteCategoryItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const checkItemData = await category.findByIdAndDelete(itemId);
    if (!checkItemData) {
      return res.status(404).json({
        success: false,
        message: "Category Item is not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting Category item - " + error,
      message,
    });
  }
};

module.exports = {
  addCategory,
  getCategoryList,
  editCategory,
  getSingleCategoryList,
  deleteCategoryItem,
};
