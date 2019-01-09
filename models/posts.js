const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var postSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  postType: {
    type: String,
    enum: ["fact", "experience", "opinion"],
    trim: true,
    required: true
  },
  body: {
    type: String,
    trim: true,
    required: true
  },
  createdAt: Date,
  score: {
    type: Number,
    default: "0"
  },
  author: {
    type: String,
    require: true,
    trim: true,
    minlength: 1
  },
  _creator: {
    required: true,
    type: mongoose.Schema.Types.ObjectId
  },
  upvoters: [
    {
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  downvoters: [
    {
      type: mongoose.Schema.Types.ObjectId
    }
  ]
});

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
