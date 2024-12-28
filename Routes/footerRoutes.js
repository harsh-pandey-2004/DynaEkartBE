const express = require("express");
const router = express.Router();

const {
  addFooter,
  getFooter,
  editFooterData,
  DeleteFooter,
} = require("../Controllers/footerController");

router.post("/add", addFooter);
router.get("/getitems", getFooter);
router.patch("/update/:id", editFooterData);
router.delete("/delete/:id", DeleteFooter);
module.exports = router;
