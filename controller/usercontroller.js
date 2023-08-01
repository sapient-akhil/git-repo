const userschema = require("../model/usermodel")
const createError = require("http-errors")
const userSchema = require("../validation/userjoi")
const params = require("../validation/paramsjoi")
const bcrypt = require("bcrypt");
const { signAccessTokenforUser } = require("../helper/usertoken")
const blogschema = require("../model/blogmodel")
const path = require("path");
const blogSchema = require("../model/blogmodel");

exports.createUser = async (req, res, next) => {

    try {
        const { username, email, firstname, lastname, password } = req.body;

        var existEmail = await userschema.findOne({ email });
        if (existEmail) throw createError.Unauthorized("This email already exists.")

        var existUsername = await userschema.findOne({ username });
        if (existUsername) throw createError.Unauthorized("This username already exists.")

        const hash = await bcrypt.hash(password, 10);

        const result = await userSchema.validateAsync(req.body);
        console.log(result)

        const file = req.files.profilepic
        const filePath = path.join(__dirname, "../uploads", `${Date.now() + '_' + file.name}`)
        console.log(filePath)

        file.mv(filePath, err => {
            if (err) return res.status(500).send(err)
        })

        const data = new userschema({ username, email, firstname, lastname, password: hash, profilepic: filePath })

        const user = await userschema.create(data);

        res.status(201).send({
            success: true,
            message: "user created successfully",
            data: user,
        });
    } catch (error) {
        next(error)
    }
}

exports.userLogin = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const user = await userschema.findOne({ email });
        if (!user) throw createError.Unauthorized("email id does not exists")
        if (user.role === "admin") throw createError.Unauthorized("This is a admin data, User cann't get....")

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw createError.Unauthorized("email or password is wrong");

        const accessToken = await signAccessTokenforUser(user);

        res.status(201).send({
            success: true,
            message: "user is login...",
            user,
            accessToken,
        })

    } catch (error) {
        next(error)
    }
}

exports.getAllBlog = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page || 1);
        const perPage = 3

        const user = await blogschema.find(req.query.search ? {
            $or: [
                { $and: [{ title: { $regex: req.query.search } }] },
                { $and: [{ author: { $regex: req.query.search } }] },
                { $and: [{ slug: { $regex: req.query.search } }] },
            ],
        } : {})
            .limit(perPage * 1)
            .skip((page - 1) * perPage)
            .exec();

        res.status(201).send({
            success: true,
            data: user
        })
    } catch (error) {
        next(error)
    }
}

exports.getOneblog = async (req, res, next) => {
    try {
        const user = await blogschema.findById(req.params.id)
        res.status(201).send({
            success: true,
            user
        })
    } catch (error) {
        next(error)
    }
}

exports.findOldestBlog = async (req, res, next) => {
    try {

        const user = await blogschema.find({status:true}).sort({ createdAt: -1 })

        res.status(201).send({
            success: true,
            message: "get all the blog",
            data: user
        })
    } catch (error) {
        next(error)
    }
}

exports.findNewestBlog = async (req, res, next) => {
    try {

        const user = await blogschema.find({}).sort({ createdAt: 1 })

        res.status(201).send({
            success: true,
            message: "get all the blog",
            data: user
        })
    } catch (error) {
        next(error)
    }
}

exports.findByDateRang = async (req, res, next) => {
    try {

        const startDate = req.body.startDate;
        const endDate = req.body.endDate;

        const dateRange = await blogSchema.find({ publishedDate: { $gte: startDate, $lt: endDate } })

        res.status(201).send({
            success: true,
            message: "Get selected blogs by date",
            data: dateRange
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteUserByAdmin = async (req, res, next) => {
    try {

        const { id } = req.params
        const result = await params.validateAsync({ id });
        console.log(result)
        const user = await userschema.findByIdAndRemove(id)

        if (!user) throw createError.Unauthorized("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "user delete successfully",
            data: user
        })
    } catch (error) {
        next(error)
    }
}

exports.updateUserByAdmin = async (req, res, next) => {
    try {

        const { id } = req.params

        const result = await params.validateAsync({ id });
        console.log(result)

        if (!req.body) throw createError.NotFound("enter update field")
        const { lastname, firstname } = req.body

        if (!lastname) throw createError.NotFound("only some field are updated")
        if (!firstname) throw createError.NotFound("only some field are updated")

        const user = await userschema.findByIdAndUpdate(id, req.body, { useFindAndModify: true })

        if (!user) throw createError.Unauthorized("ENTER VALID ID..")

        res.status(201).send({
            success: true,
            message: "user update successfully",
            data: user
        })

    } catch (error) {
        next(error)
    }
}













// $or: [
//     { $and: [{ title: req.query.search }] },
//     { $and: [{ author: req.query.search }] },
//     { $and: [{ slug: req.query.search }] },
// ],