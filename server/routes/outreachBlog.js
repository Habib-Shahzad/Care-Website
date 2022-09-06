const router = require('express').Router();
const OutReachBlog = require('../schema').outreachBlog;

const admin_auth = require("./middleware/admin_auth");

router.get('/table-data', async (req, res) => {
    const outreachBlogs = await OutReachBlog.find({})
        .populate('imageList');
    ;
    res.json({ data: outreachBlogs });
});

router.get('/table-data-auto', async (req, res) => {
    const outreachBlogs = await OutReachBlog.find({})
        .populate('imageList');
    ;
    res.json({ data: outreachBlogs });
});

router.post('/add', admin_auth, async (req, res) => {
    const data = req.body;
    const newOutReachBlog = new OutReachBlog(data);
    newOutReachBlog.save();
    res.json({ data: newOutReachBlog });
});

router.post('/update', admin_auth, async (req, res) => {
    const data = req.body;
    const outReachBlog = await OutReachBlog.findOne({ _id: data._id });
    outReachBlog.title = data.title;
    outReachBlog.content = data.content;
    outReachBlog.imageList = data.imageList;
    outReachBlog.active = data.active;
    await outReachBlog.save();
    res.json({ data: outReachBlog });
});


router.post('/delete', admin_auth, async (req, res) => {
    await OutReachBlog.deleteMany({ _id: { $in: req.body.data } });
    const outreachBlogs = await OutReachBlog.find({});
    res.json({ success: true, data: outreachBlogs });
});

router.post("/set-active", admin_auth, async (req, res) => {
    const { active, selected } = req.body;
    await OutReachBlog.updateMany({ _id: { $in: selected } }, { active: active });
    const outReachblogs = await OutReachBlog.find({}, { uid: 0 });
    res.json({ success: true, data: outReachblogs });
});


module.exports = router;