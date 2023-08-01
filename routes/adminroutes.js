const express = require("express")
const router = express.Router();
const admincontroller = require("../controller/admincontroller");

router.post("/adminlogin", admincontroller.adminLogin)

module.exports = router;