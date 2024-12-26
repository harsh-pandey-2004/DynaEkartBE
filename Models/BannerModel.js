const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    heading: {
      type: String,
      required: true,
    },
    paragraph: {
      type: String,
      required: true,
    },
    btnName:{
        type:String,
        required:true,
    },
    btnColor:{
        type:String,
        required:true,
    },
    bannerImage:{
      type:String,
    required:true,
    }
  },
);
  
  module.exports = mongoose.model("Banner", BannerSchema);