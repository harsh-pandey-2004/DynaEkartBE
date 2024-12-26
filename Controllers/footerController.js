const footer = require("../Models/FooterModel");

const addFooter = async (req, res) => {
  try {
    const { headersection, itemname, itemlink, itemicon } = req.body;
    const checkexisting = await footer.findOne({ headersection });
    if (checkexisting) {
      return res
        .status(400)
        .json({ success: false, message: "this header is already exist" });
    }
    const Items = [
      {
        itemname,
        itemlink,
        itemicon,
      },
    ];
    const newFooter = new footer({
      headersection,
      Items,
    });
    const footerData = await newFooter.save();
    return res.status(200).json({
      success: true,
      message: "footer header added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding footer Items",
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
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Editing Footer - " + error.message,
    });
  }
};

module.exports = { addFooter, getFooter };
