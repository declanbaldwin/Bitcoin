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
    }
});

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };
