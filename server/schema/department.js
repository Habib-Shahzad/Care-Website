const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: [
        {
            name: { type: String, required: true },
            role: { type: String, required: true },
            image: { data: Buffer, contentType: String },
        }
    ],
});
const Departent = mongoose.model("departments", departmentSchema);
module.exports = Departent;
