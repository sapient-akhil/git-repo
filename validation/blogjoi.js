const joi = require("joi");
const blogtype = ["health", "travel", "sports", "study"]

const userschema = joi.object().keys({
    publisher: joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    title: joi.string().required(),
    slug: joi.string().trim().required(),
    author: joi.string().required(),
    content: joi.string().required(),
    blogtype: joi.string().valid(...blogtype).required(),
    publishedDate: joi.string().trim().required(),
    status: joi.string().trim().required(),
})

module.exports = userschema;