const router = require('express').Router();
const Blog = require('../schema').blog;

const admin_auth = require("./middleware/admin_auth");

router.get('/table-data', async (req, res) => {
    const blogs = await Blog.find({});
    res.json({ data: blogs });
});

router.get('/table-data-auto', async (req, res) => {
    const blogs = await Blog.find({})
        .populate('imageList');
    ;
    res.json({ data: blogs });
});

router.post('/add', admin_auth, async (req, res) => {
    const data = req.body;
    const newBlog = new Blog(data);
    newBlog.save();
    res.json({ data: newBlog });
});

router.post('/update', admin_auth, async (req, res) => {
    const data = req.body;
    const blog = await Blog.findOne({ _id: data._id });
    blog.title = data.title;
    blog.content = data.content;
    blog.imageList = data.imageList;
    blog.active = data.active;
    await blog.save();
    res.json({ data: blog });
});



router.post('/delete', admin_auth, async (req, res) => {
    await Blog.deleteMany({ _id: { $in: req.body.data } });
    const blogs = await Blog.find({});
    res.json({ success: true, data: blogs });
});


module.exports = router;