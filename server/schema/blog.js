const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const blogsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    active: { type: Boolean, default: true },
    imageList: [
        {
            type: Schema.Types.ObjectId,
            ref: 'images',
            required: true
        }
    ]
});

const Blog = mongoose.model('blogs', blogsSchema);
module.exports = Blog;

