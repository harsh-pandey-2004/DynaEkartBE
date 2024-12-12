const logo = require("../Models/logoModel");

const addLogo = async (req, res) => {
  try {
    const imageurl = req.body;
    const newlogo = new logo(imageurl);
    const savedLogo = await newlogo.save();
    if (!savedLogo) {
      return res.status(400).json({ message: "Failed to add logo" });
    }
    res.status(201).json({ message: "Logo added successfully", savedLogo });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error adding logo - " + error.message });
  }
};

const getLogo = async (req, res) => {
  try {
    const logoimg = await logo.find();
    if (!logoimg) {
      return res.status(500).json({
        success: false,
        message: "No Data in Database",
      });
    }
    return res
      .status(200)
      .json({
        data: logoimg,
        success: true,
        mesage: "logo fetched successfully",
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error getting logo - " + error.message });
  }
};

const editLogo = async (req, res) => {
  try {
    const logoId = req.params.id;
    const { imageurl } = req.body;
    const editData = await logo.findByIdAndUpdate(
      logoId,
      { imageurl },
      {
        new: true,
      }
    );
    if (!editData) {
      return res.status(404).json({
        success: false,
        message: "no logo found",
      });
    }
    return res.status.json({
      success: true,
      data: editData,
      message: "Logo Edited successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: "Error editing logo - " + error.message,
    });
  }
};

const deleteLogo = async (req, res) => {
  try {
    const logoId = req.params.id;
    const checkdlt = await logo.findByIdAndDelete(id);
    if (!checkdlt) {
      return res.status(404).json({ message: "Logo not found" });
    }
    return res.status(200).json({ message: "Logo deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting logo - " + error.message,
    });
  }
};

module.exports = { addLogo, getLogo, editLogo, deleteLogo };
