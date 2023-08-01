const mongoose = require("mongoose");

const blogschema = new mongoose.Schema({
    publisher: {
        type: mongoose.Types.ObjectId,
        require: [true, "publisher is required"]
    },
    title: {
        type: String,
        require: [true, "title is require"]
    },
    slug: {
        type: String,
        require: [true, "slug is required"]
    },
    author: {
        type: String,
        require: [true, "author is required"]
    },
    content: {
        type: String,
        require: [true, "content is required"]
    },
    blogtype: {
        type: String,
        require: [true, "blogtype is required"]
    },
    publishedDate: {
        type: Date,
        require: [true, "publishedDate is require"]
    },
    status: {
        type: Boolean,
        require: [true, "status is require"]
    }
}, { timestamps: true })

const blogSchema = mongoose.model("bloginfo", blogschema)
module.exports = blogSchema;

