const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT
const createError = require("http-errors")
const fileUpload = require('express-fileupload')
app.use(fileUpload())
const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// const verifyAccessTokenforAdmin  = require("./helper/usertoken")

// app.use(verifyAccessTokenforAdmin)

require("./config/mongodb");

app.get("/", (req, res) => {
    res.send("project is start...")
})

app.all("/", (req, res) => {
    res.status(200).send("mongoDB is connected...")
})

app.all('/', (req, res) => { return res.status(200).send("mongodb Connected...") })

app.use("/user", require("./routes/userroutes"))
app.use("/blog", require("./routes/blogroutes"))
app.use("/admin", require("./routes/adminroutes"))

app.use(async (req, res, next) => {
    const err = createError.BadRequest("URL not found")
    next(err);
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    })
})

app.listen(PORT, () => {
    console.log(`server is running on port number ${PORT}`)
})