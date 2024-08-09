const router = require('express').Router()
const courseControl = require("../controller/courseControl")
const verifyUserToken = require("../middleware/authUser")


router.get("/courses", courseControl.searchApi),
router.get("/short-details", courseControl.shortDetails),
router.get('/courses/:id', courseControl.searchByID),
router.get("/catagories", courseControl.catagories);
router.get("/search", courseControl.searchApi),
router.get("/serach/categories", courseControl.searchCategory);

router.get('/courses/:id', courseControl.searchByID),

// router.post('/saved', courseControl.addSaved),





module.exports = router;
