const mongoose = require("mongoose");

const FooterSchema = new mongoose.Schema({
  headersection: {
    type: String,
    required: true,
  },
  Items: [
    {
      itemname: {
        type: String,
        required: true,
      },
      itemicon: {
        type: String,
        required: true,
      },
      itemlink: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Footer", FooterSchema);
