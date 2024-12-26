const mongoose = require("mongoose");

const LogoSchema = new mongoose.Schema({
  imageurl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("logo", LogoSchema);
