const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  header: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  blogimage: {
    type: String,
  },
});

module.exports = mongoose.model("blog", BlogSchema);
