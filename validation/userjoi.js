const joi = require("joi");

const userSchema = joi.object().keys({
    id: joi.string().regex(/^[0-9a-fA-F]{24}$/).message("ENTER VALID ID..."),
    username: joi.string().required(),
    email: joi.string().email().required(),
    firstname: joi.string().trim().required(),
    lastname: joi.string().required(),
    password: joi.string().min(5).max(10).required()
})

module.exports = userSchema;

