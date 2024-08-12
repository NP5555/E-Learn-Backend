const adminControl = require('../controller/adminControl')
const Admin = require("../models/adminSchema")
const { verifyAdminToken } = require('../middleware/authAdmin')
const router = require('express').Router()

router.post("/login", adminControl.Login)
router.get("/user",verifyAdminToken, adminControl.user)


module.exports = router;