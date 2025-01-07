const express = require("express");
const router = express.Router();

const {
  AddBanner,
  GetBanners,
  DeleteBanner,
  UpdateBanner,
} = require("../Controllers/heroBannerController");

router.post("/add", AddBanner);
router.get("/getbanner", GetBanners);
router.patch("/update/:id", UpdateBanner);
router.delete("/delete/:id", DeleteBanner);

module.exports = router;
