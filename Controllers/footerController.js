const footer = require("../Models/FooterModel");

const addFooter = async (req, res) => {
  try {
    const { headersection, Items } = req.body;
    const checkexisting = await footer.findOne({ headersection });
    if (checkexisting) {
      return res
        .status(400)
        .json({ success: false, message: "this header is already exist" });
    }
    const newFooter = new footer({
      headersection,
      Items,
    });
    await newFooter.save();
    return res.status(200).json({
      success: true,
      message: "footer header added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding footer Items" + error,
    });
  }
};

const getFooter = async (req, res) => {
  try {
    const footerData = await footer.find();
    if (!footerData) {
      return res.status(404).json({
        success: false,
        message: "No data found in footer",
      });
    }
    return res.status(200).json({
      success: true,
      data: footerData,
      message: "Footer data fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching footer Items - " + error.message,
    });
  }
};

const editFooterData = async (req, res) => {
  try {
    const { headersection, Items } = req.body;
    const { id } = req.params;
    const checkexisting = await footer.findById(id);
    if (!checkexisting) {
      return res.status(404).json({
        success: false,
        message: "Footer item not found",
      });
    }
    const updatedFooter = await footer.findByIdAndUpdate(id, {
      headersection,
      Items,
    });
    if (!updatedFooter) {
      return res.status(404).json({
        success: false,
        message: "Footer item not found for update",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Footer item updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Editing Footer - " + error.message,
    });
  }
};

const DeleteFooter = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFooter = await footer.findByIdAndDelete(id);
    if (!deletedFooter) {
      return res.status(404).json({
        success: false,
        message: "Footer item not found for delete",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Footer item deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Deleting Footer - " + error.message,
    });
  }
};

module.exports = { addFooter, getFooter, editFooterData, DeleteFooter };
