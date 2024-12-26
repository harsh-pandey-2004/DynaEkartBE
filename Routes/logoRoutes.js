const express = require("express");
const router = express.Router();

const {
  addLogo,
  getLogo,
  editLogo,
  deleteLogo,
} = require("../Controllers/logoController");

router.post("/add", addLogo);
router.get("/getlogo", getLogo);
router.patch("/edit/:id", editLogo);
router.delete("/delete/:id", deleteLogo);

module.exports = router;
