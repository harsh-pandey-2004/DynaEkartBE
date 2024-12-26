const express = require("express");
const router = express.Router();

const {
    addBanner,
    getBanner,
    deleteBanner,
    editBanner,

} = require("../Controllers/BannerController");

router.post("/add", addBanner);
router.get("/get", getBanner);
router.patch("/edit/:id", editBanner);
router.delete("/delete", deleteBanner);

module.exports = router;