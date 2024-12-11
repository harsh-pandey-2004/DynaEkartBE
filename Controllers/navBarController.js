const Navbar = require("../Models/navBarModel");

const addNavBarItems = async (req, res) => {
  try {
    const { name, link } = req.body;
    const existingname = await Navbar.findOne({ name });
    if (existingname) {
      return res
        .status(400)
        .json({ message: "This Item is already in navbar" });
    }
    const newNavbar = new Navbar({
      name,
      link,
    });
    await newNavbar.save();
    return res.status(200).json({
      sucess: true,
      message: "Item is added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Item is not Added - " + error.message,
    });
  }
};

const GetNavBarItems = async (req, res) => {
  try {
    const NavBarData = await Navbar.find();
    if (!NavBarData) {
      return res.status(404).json({
        success: false,
        message: "No Data Found",
      });
    }
    return res.status(200).json({
      NavBarData,
      message: "Data Fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting Navbar items - " + error.message,
    });
  }
};

const deleteNavItems = async (req, res) => {
  try {
    const NavItem = req.body;
    const checkdelete = await Navbar.findOneAndDelete(NavItem);
    if (!checkdelete) {
      return res.status(400).json({ message: "no item found to delete" });
    }
    return res.status(200).json({ message: "item deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting Navbar item - " + error.message });
  }
};

const editNavBarItem = async (req, res) => {
  try {
    const NavItemId = req.param;
    const newName = req.body;
    const checkupdate = await Navbar.findOneAndUpdate(NavItemId, {
      name: newName,
    });
    if (!checkupdate) {
      return res.status(400).json({ message: "no item found to update" });
    }
    return res.status(200).json({ message: "item updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error Editing Navbar item - " + error.message });
  }
};

module.exports = {
  addNavBarItems,
  GetNavBarItems,
  deleteNavItems,
  editNavBarItem,
};
