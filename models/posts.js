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
    required: true,
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
      type: String
    }
  ],
  downvoters: [
    {
      type: String
    }
  ]
});

postSchema.index({
  title: 'text',
  body: 'text',
}, {
  weights: {
    name: 5,
    description: 1,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
