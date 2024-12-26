const express = require("express");
const router = express.Router();

const {
  addNavBarItems,
  GetNavBarItems,
  editNavBarItem,
  deleteNavItems,
} = require("../Controllers/navBarController");

router.post("/add", addNavBarItems);
router.get("/get", GetNavBarItems);
router.patch("/edit/:id", editNavBarItem);
router.delete("/delete", deleteNavItems);

module.exports = router;

