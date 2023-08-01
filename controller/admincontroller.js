const userschema = require("../model/usermodel")
const createError = require("http-errors")
const bcrypt = require("bcrypt");
const { signAccessTokenforAdmin } = require("../helper/usertoken")

exports.adminLogin = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        console.log("email password", req.body)

        const user = await userschema.findOne({ email });
        if (!user) throw createError.Unauthorized("email id does not exists")

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw createError.Unauthorized("email or password is wrong");

        const accessToken = await signAccessTokenforAdmin(user);
        // console.log(accessToken)

        res.status(201).send({
            success: true,
            message: "admin is login...",
            user,
            accessToken,
        })

    } catch (error) {
        next(error)
    }
}