const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const Article = new Schema({
  title:{
    type:String,
    minlength: 3,
    required:true
  },
  discription:{
    type:String,
    minlength: 3,
  },
  thumbnail:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true
  },
  articlePicturs:{
    type: [String],
  },
  author:{
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true
  }

},{
    timestamps: true
});


module.exports = model("article", Article);
