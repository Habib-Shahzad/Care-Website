const router = require('express').Router();
const Department = require('../schema').department;

const admin_auth = require("./middleware/admin_auth");

router.get('/table-data', async (req, res) => {
    const departments = await Department.find({})
        .populate({
            path: 'members',
            populate: [
                { path: 'image' },
            ]
        });
    res.json({ data: departments });
});

router.get('/table-data-auto', async (req, res) => {
    const departments = await Department.find({})
        .populate({
            path: 'members',
            populate: [
                { path: 'image' },
            ]
        });

    res.json({ data: departments });
});


router.post('/add', admin_auth, async (req, res) => {
    const data = req.body;
    const newDepartment = new Department(data);
    newDepartment.save();
    res.json({ data: newDepartment });
});

router.post('/update', admin_auth, async (req, res) => {
    const data = req.body;
    const department = await Department.findOne({ _id: data._id });
    department.name = data.name;
    department.active = data.active;
    department.members = data.members;
    await department.save();
    res.json({ data: department });
});


router.post('/delete', admin_auth, async (req, res) => {
    await Department.deleteMany({ _id: { $in: req.body.data } });
    const departments = await Department.find({});
    res.json({ success: true, data: departments });
});


router.post("/set-active", admin_auth, async (req, res) => {
    const { active, selected } = req.body;
    await Department.updateMany({ _id: { $in: selected } }, { active: active });
    const departments = await Department.find({}, { uid: 0 });
    res.json({ success: true, data: departments });
});

module.exports = router;