const path = require("path");

module.exports = {
    imageupload:
        function (req, res, next) {
            const file = req.files.profilepic
            const filePath = path.join(__dirname, "../uploads", `${file.name+_+Date.now()}`)
            console.log(filePath)

            file.mv(filePath, err => {
                if (err) return res.status(500).send(err)

                next();

            })
        }
}

// var multer = require("multer");
// const path = require("path")

// var storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, "./uploads");
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.fieldname + '_' + Date.now()
//             + path.extname(file.originalname));
//     },
// });

// var upload = multer({
//     storage,
//     onError: function (err, next) {
//         console.log("MulterError", err);
//         next(err);
//     },
// });

// module.exports = {
//     imageupload: function (req, res, next) {
//         const images = [];

//         req.files.profilepic = !req.files.profilepic.length ? [req.files.profilepic] : req.files.profilepic

//         for (let i = 0; i < req.files.profilepic.length; i++) {
//             const profilepic = req.files.profilepic[i];
//             console.log(profilepic);
//             const filePath = path.join(__dirname, "../uploads", `${profilepic.name}`)

//             new Promise((resolve) => {
//                 profilepic.mv(filePath, (err) => {
//                     if (err) throw err;
//                     console.log(profilepic);
//                     if (!err) images.push(`../uploads/${profilepic.name}`);
//                     resolve(true);
//                     next()

//                 })
//             })
//         }

//     }
// }


// module.exports = {
//     imageupload:
//         function (req, res,) {

//             if (!req.files || Object.keys(req.files).length === 0) {
//                 res.status(400).send('No files were uploaded.');
//                 return;
//             }
//             const file = req.files[Object.keys(req.files)[0]];

//             const filePath = path.join(__dirname, "../uploads", `${file.name}`)
//             console.log(filePath)

//             file.mv(filePath, err => {
//                 if (err) return res.status(500).send(err)

//                 res.send('File uploaded to ' + filePath);

//             })
//         }
// }
