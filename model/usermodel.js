const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
        require: [true, "publisher is required"]
    },
    username: {
        type: String,
        require: [true, "username is required"]
    },
    email: {
        type: String,
        require: [true, "email is required"]
    },
    firstname: {
        type: String,
        require: [true, "firstname is required"]
    },
    lastname: {
        type: String,
        require: [true, "lastname is required"]
    },
    password: {
        type: String,
        require: [true, "password is required"]
    },
    profilepic: {
        type: String,
        require: [true, "profilepic is required"]
    },
    role: {
        type: String,
        default: "user"
    }
}, { timestamps: true })

const userschema = mongoose.model("userinfo", userSchema)
module.exports = userschema;