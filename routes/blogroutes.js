const express = require("express")
const router = express.Router();
const blogcontroller = require("../controller/blogcontroller");
const { verifyAccessTokenforAdmin } = require("../helper/usertoken")

router.post("/createblog",verifyAccessTokenforAdmin, blogcontroller.createBlog)
router.post("/findbyslug/:slug",verifyAccessTokenforAdmin, blogcontroller.findBySlug)
router.patch("/updateblog/:id",verifyAccessTokenforAdmin, blogcontroller.updateBlog)
router.delete("/deleteblog/:id",verifyAccessTokenforAdmin, blogcontroller.deleteBlog)

module.exports = router;