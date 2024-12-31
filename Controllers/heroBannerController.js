const heroBanner = require("../Models/HeroBannerModel");

const AddBanner = async (req, res) => {
  try {
    const { title, subtitle, image, button, buttonLink, background } = req.body;
    const checkExisting = await heroBanner.findOne({ title });
    if (checkExisting) {
      return res.status(400).json({ message: "Banner already exists" });
    }
    const banner = new heroBanner({
      title,
      subtitle,
      image,
      button,
      buttonLink,
      background,
    });
    await banner.save();
    res.status(201).json({ message: "Banner Added Successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Adding banner - " + error.message,
    });
  }
};

const GetBanners = async (req, res) => {
  try {
    const banners = await heroBanner.find();
    if (!banners) {
      return res.status(404).json({ message: "No banners found" });
    }
    res.status(200).json(banners);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching banners - " + error.message,
    });
  }
};

const DeleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await heroBanner.findByIdAndDelete(id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting banner - " + error.message,
    });
  }
};

const UpdateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, image, button, buttonLink, background } = req.body;
    const banner = await heroBanner.findByIdAndUpdate(
      id,
      {
        title,
        subtitle,
        image,
        button,
        buttonLink,
        background,
      },
      { new: true }
    );
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }
    res.status(200).json({ message: "Banner updated successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating banner - " + error.message,
    });
  }
};

module.exports = { AddBanner, GetBanners, UpdateBanner, DeleteBanner };
