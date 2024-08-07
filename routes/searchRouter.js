const router = require('express').Router()
const searchControl = require("../controller/searchControl")



router.get("/courses", searchControl.searchApi)

router.get('/courses/:id', async (req, res) => {
    // console.log(12323)
    try {
        const id = parseInt(req.params.id); // Convert the id parameter to an integer


        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid id parameter' });
        }
        const course = data.filter((course) => course.id === id); // Query for courses with id greater than the provided value
        if(course.length < 1) {
           return res.status(404).json({msg: "CourseID not found"})
        }

       res.json(course)
 
        
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router