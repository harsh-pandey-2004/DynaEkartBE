const Banner = require("../Models/BannerModel");

const addBanner = async (req, res) => {
  try {
    const { name, heading, paragraph, btnName, btnColor,bannerImage } = req.body;

    const existingBanner = await Banner.findOne({ heading });
    if (existingBanner) {
      return res
        .status(400)
        .json({ message: "This Item is already in  Banner" });
    }

    const newBanner = new Banner({
      name,
      heading,
      paragraph,
      btnName,
      btnColor,
      bannerImage
    });

    await newBanner.save();

    return res.status(200).json({
      success: true,
      message: "Item is added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Item is not Added - " + error.message,
    });
  }
};

const getBanner = async (req, res) => {
  try {
    const BannerData = await Banner.find();
    if (!BannerData) {
      return res.status(404).json({
        success: false,
        message: "No Data Found",
      });
    }
    return res.status(200).json({
      data:BannerData,
      message: "Data Fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting banner - " + error.message,
    });
  }
};
const deleteBanner = async (req, res) => {
  try {
    const { BannerName } = req.body;
    const checkdelete = await Banner.findOneAndDelete({ BannerName });
    if (!checkdelete) {
      return res.status(400).json({ message: "no item found to delete" });
    }
    return res.status(200).json({ message: "item deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting Banner - " + error.message });
  }
};
const editBanner = async (req, res) => {
  try {
    const  BannerId  = req.params.id;
    const { heading, paragraph, btnName, btnColor,bannerImage } = req.body;
    const checkUpdate = await Banner.findByIdAndUpdate(
    BannerId,
      {
        heading,
        bannerImage,
        paragraph,
        btnName,
        btnColor,
      },
      { new: true } 
    );

    if (!checkUpdate) {
      return res.status(400).json({ message: "No item found to update" });
    }

    return res.status(200).json({
      message: "Item updated successfully",
      data: checkUpdate,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error editing banner - " + error.message,
    });
  }
};
module.exports = {
  addBanner,
  getBanner,
  deleteBanner,
  editBanner,
};
