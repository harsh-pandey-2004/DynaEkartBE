const Brand = require("../Models/BrandModel");

// Add a new brand
const addBrand = async (req, res) => {
  try {
    const { name, logo } = req.body;

    // Check if the brand already exists
    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      return res
        .status(400)
        .json({ message: "This Brand already exists" });
    }

    // Create a new brand
    const newBrand = new Brand({
      name,
      logo,
    });

    // Save the brand to the database
    await newBrand.save();

    return res.status(200).json({
      success: true,
      message: "Brand added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding brand: " + error.message,
    });
  }
};

const getBrand = async (req, res) => {
  try {
    const brandData = await Brand.find();
    if (!brandData || brandData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No brands found",
      });
    }
    return res.status(200).json({
      success: true,
      data: brandData,
      message: "Brands fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching brands: " + error.message,
    });
  }
};

const deleteBrand = async (req, res) => {
  try {
    const { name } = req.body; 

    const checkDelete = await Brand.findOneAndDelete({ name });
    if (!checkDelete) {
      return res.status(400).json({ message: "No brand found to delete" });
    }

    return res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting brand: " + error.message,
    });
  }
};

const editBrand = async (req, res) => {
  try {
    const brandId = req.params.id;
    const { name, logo } = req.body;

    const checkUpdate = await Brand.findByIdAndUpdate(
      brandId,
      { name, logo },
      { new: true }
    );

    if (!checkUpdate) {
      return res.status(400).json({ message: "No brand found to update" });
    }

    return res.status(200).json({
      success: true,
      message: "Brand updated successfully",
      data: checkUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error editing brand: " + error.message,
    });
  }
};

module.exports = {
  addBrand,
  getBrand,
  deleteBrand,
  editBrand,
};
