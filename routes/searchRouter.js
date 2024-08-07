const router = require('express').Router()
const searchControl = require("../controller/searchControl")



router.get("/courses", searchControl.searchApi),

router.get('/courses/:id', searchControl.searchByID),




module.exports = router