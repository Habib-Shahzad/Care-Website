const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const activitiesSchema = new mongoose.Schema({
    imageList: [String],
    title: { type: String, required: true },
    content: { type: String, required: true },
});

const Activity = mongoose.model('activities', activitiesSchema);
module.exports = Activity;

