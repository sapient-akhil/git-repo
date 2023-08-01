const blogschema = require("../model/blogmodel")
const createError = require("http-errors")
const blogSchema = require("../validation/blogjoi")
const params = require("../validation/paramsjoi")

exports.createBlog = async (req, res, next) => {
    try {
        const { title, slug, author, content, blogtype, publishedDate, status } = req.body;

        const existsSlug = await blogschema.findOne({ slug });
        if (existsSlug) throw createError.Unauthorized("slug is already exists..")

        const result = await blogSchema.validateAsync(req.body);
        console.log(result)

        const payload = req.payload;
        const id = payload._id

        const data = new blogschema({ publisher: id, title, slug, author, content, blogtype, publishedDate, status })

        const user = await blogschema.create(data);

        res.status(201).send({
            success: true,
            message: "blog created successfully",
            data: user,
            // decoded
        })
    } catch (error) {
        next(error)
    }
}

exports.findBySlug = async (req, res, next) => {
    try {
        const slug = req.params.slug;

        const user = await blogschema.findOne({ slug })
        if (!user) throw createError.Unauthorized("please enter valid slug")

        res.status(201).send({
            success: true,
            message: "get all the blog",
            data: user
        })
    } catch (error) {
        next(error)
    }
}

exports.updateBlog = async (req, res, next) => {
    try {

        const { id } = req.params
        const blogparams = await params.validateAsync({ id });
        console.log(blogparams)

        const { title, slug, author, content, blogtype, publishedDate, status } = req.body;

        const result = await blogSchema.validateAsync(req.body);
        console.log(result)

        const existsSlug = await blogschema.findOne({ slug });
        if (existsSlug) throw createError.Unauthorized("slug is already exists..")

        const user = await blogschema.findByIdAndUpdate(id, { $set: { title, slug, author, content, blogtype, publishedDate, status } })

        if (!user) throw createError.Unauthorized("ENTER VALID ID...")

        res.status(201).send({
            success: true,
            message: "blog update successfully",
            data: user
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteBlog = async (req, res, next) => {
    try {

        const { id } = req.params
        const result = await params.validateAsync({ id });
        console.log(result)
        const user = await blogschema.findByIdAndRemove(req.params.id, { useFindAndModify: true })

        if (!user) throw createError.Unauthorized("ENTER VALID ID...")

        res.status(201).send({
            success: true,
            message: "blog delete successfully",
            data: user
        })
    } catch (error) {
        next(error)
    }
}