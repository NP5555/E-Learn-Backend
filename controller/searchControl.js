const data = require("../data");

// /search/courses
exports.searchApi = async (req, res, next) => {
  const filters = req.query;
  const filteredUsers = data.filter((user) => {
    let isValid = true;

    for (key in filters) {
      console.log(key, user[key], filters[key]);
      isValid = isValid && user[key] == filters[key];
    }
    return isValid;
  });
  res.send(filteredUsers);
};


exports.searchByID =  async (req, res) => {
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
};