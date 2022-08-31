const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: {
        type: Boolean,
        default: true,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
        required: true,
    },
});
const User = mongoose.model("users", userSchema);
module.exports = User;
