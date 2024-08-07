const router = require('express').Router()
const authControll = require("../controller/authControl")


router.post("/register", authControll.register)
router.post("/login", authControll.login)
router.delete("/delete", authControll.deleteUser)



module.exports = router