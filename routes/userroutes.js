const express = require("express")
const router = express.Router();
const usercontroller = require("../controller/usercontroller");
const { verifyAccessTokenforUser } = require("../helper/usertoken")
const { verifyAccessTokenforAdmin } = require("../helper/usertoken")


router.post("/createuser", usercontroller.createUser)
router.post("/userlogin", usercontroller.userLogin)
router.get("/getallblog", usercontroller.getAllBlog)
router.get("/getoneblog/:id", usercontroller.getOneblog)
router.get("/findoldestblog", usercontroller.findOldestBlog)
router.get("/findNewestBlog", usercontroller.findNewestBlog)
router.post("/findByDateRang", usercontroller.findByDateRang)
router.delete("/deleteuserbyadmin/:id", verifyAccessTokenforAdmin, usercontroller.deleteUserByAdmin)
router.patch("/updateuserbyadmin/:id", verifyAccessTokenforAdmin, usercontroller.updateUserByAdmin)

module.exports = router;