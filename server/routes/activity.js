const router = require('express').Router();
const Activity = require('../schema').activity;


router.get('/table-data', async (req, res) => {
    const activities = await Activity.find({});
    res.json({ data: activities });
});


module.exports = router;




