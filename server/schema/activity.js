const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

const activitiesSchema = new mongoose.Schema({
    imageList: [{
        type: Schema.Types.ObjectId,
        ref: 'images',
        required: true
    }],
    active: { type: Boolean, default: true },
    activityDate: { type: Date, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
});

const Activity = mongoose.model('activities', activitiesSchema);
module.exports = Activity;

