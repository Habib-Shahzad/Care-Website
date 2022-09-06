const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const outreachBlogsSchema = new mongoose.Schema({
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

const OutreachBlog = mongoose.model('outreachBlogs', outreachBlogsSchema);
module.exports = OutreachBlog;

