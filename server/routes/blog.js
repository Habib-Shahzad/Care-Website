const router = require('express').Router();
const Blog = require('../schema').blog;


router.get('/table-data', async (req, res) => {
    const blogs = await Blog.find({});
    res.json({ data: blogs });
});



