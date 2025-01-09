const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  //   password: {
  //     type: String,
  //     required: true,
  //   },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  phone: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("user", UserSchema);
