const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required:true,
    },
    mobile_no: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "NORMAL",
    },
    skills: {
        type: String,
        required: true,
        default: "Enter your skills",
    },
    job: {
        type: String,
        required: true,
        default: "Enter your dream job",
    },
}, { timestamps: true });

const newUser = mongoose.model("user", userSchema);

module.exports = newUser;