const router = require('express').Router()
const courseControl = require("../controller/courseControl")



router.get("/search", courseControl.search);
router.get("/catagories", courseControl.catagories);
router.get("/courses", courseControl.searchApi),
router.get("/serach/categories", courseControl.searchCategory);

router.get('/courses/:id', courseControl.searchByID),




module.exports = router;
