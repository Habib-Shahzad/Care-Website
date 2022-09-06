const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    active: { type: Boolean, required: true },
    members: [
        {
            name: { type: String, required: true },
            role: { type: String, required: true },
            image: {
                type: Schema.Types.ObjectId,
                ref: 'images',
                required: true
            },
        }
    ],
});
const Department = mongoose.model("departments", departmentSchema);
module.exports = Department;
