const mongoose = require("mongoose");

const HeroBannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  image: { type: String, required: true },
  button: { type: String },
  buttonLink: { type: String },
  background: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("heroBanner", HeroBannerSchema);
