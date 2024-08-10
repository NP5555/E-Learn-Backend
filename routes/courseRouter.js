const router = require('express').Router()
const courseControl = require("../controller/courseControl");
const { verifyUserToken } = require('../middleware/authUser');


<<<<<<< HEAD
router.get("/courses", courseControl.searchApi),
router.get("/featured", courseControl.featured),
router.get("/searchById/:id", courseControl.searchByID),
router.get("/catagories", courseControl.catagories);
router.get("/search", courseControl.search);
router.get("/serach/categories", courseControl.searchCategory);
=======
router.get("/courses",verifyUserToken, courseControl.searchApi),
router.get("/short-details",verifyUserToken, courseControl.shortDetails),
router.get("/searchById/:id",verifyUserToken, courseControl.searchByID),
router.get("/catagories",verifyUserToken, courseControl.catagories);
router.get("/search",verifyUserToken, courseControl.search);
router.get("/serach/categories",verifyUserToken, courseControl.searchCategory);
>>>>>>> 9bef7b86fa654f35ec5e80a1aa1acc7e8a9edb16
router.get("/saved", verifyUserToken, courseControl.getSavedCourse) 
router.post("/saved", verifyUserToken, courseControl.addSaved) 
router.delete("/saved", verifyUserToken, courseControl.deleteSaved) 
router.post("/bought-courses", verifyUserToken, courseControl.buyCourse)
<<<<<<< HEAD
router.delete("/deleteBuy-courses", verifyUserToken, courseControl.deleteBoughtCourse)
router.post('/reviews', verifyUserToken, courseControl.addReview)
router.delete('/reviews', verifyUserToken, courseControl.deleteReview)
=======
router.get("/bought-courses", verifyUserToken, courseControl.getBoughtCourse)
router.delete("/bought-courses", verifyUserToken, courseControl.deleteBoughtCourse)



>>>>>>> 9bef7b86fa654f35ec5e80a1aa1acc7e8a9edb16

module.exports = router;
