const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var postSchema = new Schema({
    title: String,
    author: String,
    body: String,
    createdAt: Date
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;