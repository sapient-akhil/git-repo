const mongoose = require("mongoose");
require("dotenv").config();

function mongoConnect() {
    mongoose.connect(process.env.URL)
        .then(() => {
            console.log("mongoDB is successfully connected...")
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = mongoConnect();