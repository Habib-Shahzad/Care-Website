const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const blogsSchema = new mongoose.Schema({
    imageList: [String],
    title: { type: String, required: true },
    content: { type: String, required: true },
});

const Blog = mongoose.model('blogs', blogsSchema);
module.exports = Blog;

