const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  categorylogo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("category", categorySchema);
