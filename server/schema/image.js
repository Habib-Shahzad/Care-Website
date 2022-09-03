const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: {
        fileName: { type: String },
        filePath: { type: String }
    },
});
const Image = mongoose.model("images", imageSchema);
module.exports = Image;
