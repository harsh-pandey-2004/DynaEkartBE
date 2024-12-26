const express = require("express");
const router = express.Router();

const {
    addBrand,
    getBrand,
    deleteBrand,
    editBrand,

} = require("../Controllers/BrandController");

router.post("/add", addBrand);
router.get("/get", getBrand);
router.patch("/edit/:id", editBrand);
router.delete("/delete", deleteBrand);

module.exports = router;