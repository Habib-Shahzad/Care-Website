const router = require('express').Router();
const Activity = require('../schema').activity;

const admin_auth = require("./middleware/admin_auth");

router.get('/table-data', async (req, res) => {
    const activities = await Activity.find({})
        .populate('imageList');
    ;
    ;
    res.json({ data: activities });
});

router.get('/table-data-auto', async (req, res) => {
    const activities = await Activity.find({})
        .populate('imageList');
    ;
    res.json({ data: activities });
});


router.post('/add', admin_auth, async (req, res) => {
    const data = req.body;
    const newActivity = new Activity(data);
    newActivity.save();
    res.json({ data: newActivity });
});

router.post('/update', admin_auth, async (req, res) => {
    const data = req.body;
    const activity = await Activity.findOne({ _id: data._id });

    activity.title = data.title;
    activity.content = data.content;
    activity.imageList = data.imageList;
    activity.active = data.active;
    activity.activityDate = data.activityDate;
    
    await activity.save();
    res.json({ data: activity });
});


router.post('/delete', admin_auth, async (req, res) => {
    await Activity.deleteMany({ _id: { $in: req.body.data } });
    const activities = await Activity.find({});
    res.json({ success: true, data: activities });
});

router.post("/set-active", admin_auth, async (req, res) => {
    const { active, selected } = req.body;
    await Activity.updateMany({ _id: { $in: selected } }, { active: active });
    const activities = await Activity.find({}, { uid: 0 });
    res.json({ success: true, data: activities });
});



module.exports = router;