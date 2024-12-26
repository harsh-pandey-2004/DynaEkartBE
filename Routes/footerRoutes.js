const express = require("express");
const router = express.Router();

const { addFooter, getFooter } = require("../Controllers/footerController");

router.post("/add", addFooter);
router.get("/getitems", getFooter);

module.exports = router;
