const Catagory = require("../models/catagoriesSchema");
const Course = require("../models/courseSchema");
const User = require("../models/userSchema");

// /search/courses
//todo fix the mess
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

// Api for specific data
exports.shortDetails = async (req, res) => {
  try {
    const projection = {
      "data.title": 1,
      "data.category": 1,
      "data.rating": 1,
      "data.price": 1,
      "data.reviews": 1,
      "data.image": 1,
    };
    const shortData = await Course.find({}, projection);
    res.status(200).json(shortData);
  } catch (error) {
    res.status(404).json({
      error: error,
    });
  }
};

// Search by ID pr anyuthing we want!
exports.searchByID = async (req, res) => {
  try {
    const id = req.params.id; // Convert the id parameter to an integer

    if (!id) {
      return res.status(400).json({ message: "Invalid id!S" });
    }
    const course = await Course.findOne({ _id: id });

    res.json({
      id: course._id,
      data: course.data,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: error });
  }
};

// search/catagories
exports.catagories = async (req, res) => {
  const catagories = await Catagory.find();

  res.status(200).send(catagories.map((cate) => cate.name));
};

// courses/search?query=${}&page=${}&limit=${}
// get all courses /courses/search
exports.search = async (req, res) => {
  try {
    const {
      query = "",
      page = 1,
      limit = 10,
      category = "",
      sortField = "",
      sortOrder = "asc",
    } = req.query;
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;
    const regex = query ? new RegExp(query, "i") : new RegExp("");

    const searchCriteria = query
      ? {
          $or: [
            { "data.details.title": { $regex: regex } },
            { "data.details.category": { $regex: regex } },
          ],
        }
      : {};
    let sortF;
    if (sortField === "price") {
      sortF = "data.details.price";
    }
    if (sortField === "rating") {
      sortF = "data.details.rating";
    }
    if (sortField === "duration") {
      sortF = "data.details.duration";
    }

    const validSortFields = [
      "data.details.price",
      "data.details.duration",
      "data.details.rating",
    ];
    const validSortOrder = ["asc", "desc"];
    let sortCriteria = {};

    if (
      sortField &&
      validSortFields.includes(sortF) &&
      validSortOrder.includes(sortOrder)
    ) {
      sortCriteria[sortF] = sortOrder === "asc" ? 1 : -1;
    } else {
      sortCriteria = { _id: 1 }; // Default sort by _id if invalid or not provided
    }

    const courses = await Course.find(searchCriteria)
      .sort(sortCriteria)
      .skip(skip)
      .limit(pageSize);

    const totalCount = await Course.countDocuments(searchCriteria);

    const coursesToSend = courses.map((course) => {
      return { id: course._id, data: course.data.details };
    });

    res.status(200).json({
      page: pageNumber,
      limit: pageSize,
      totalResults: totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      results: coursesToSend,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching courses" });
  }
};

// serach/category?
exports.searchCategory = async (req, res) => {
  try {
    const {
      query = "",
      page = 1,
      limit = 10,
      category = "",
      sortField = "",
      sortOrder = "asc",
    } = req.query;
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;
    const regexQuery = query ? new RegExp(query, "i") : new RegExp("");

    const searchCriteria = {
      $and: [
        category
          ? { "data.details.category": { $regex: category, $options: "i" } }
          : {},
        query ? { "data.details.title": { $regex: regexQuery } } : {},
      ],
    };

    let sortF;
    if (sortField === "price") {
      sortF = "data.details.price";
    }
    if (sortField === "rating") {
      sortF = "data.details.rating";
    }
    if (sortField === "duration") {
      sortF = "data.details.duration";
    }

    const validSortFields = [
      "data.details.price",
      "data.details.duration",
      "data.details.rating",
    ];
    const validSortOrder = ["asc", "desc"];
    let sortCriteria = {};

    if (
      sortField &&
      validSortFields.includes(sortF) &&
      validSortOrder.includes(sortOrder)
    ) {
      sortCriteria[sortF] = sortOrder === "asc" ? 1 : -1;
    } else {
      sortCriteria = { _id: 1 }; // Default sort by _id if invalid or not provided
    }

    searchCriteria.$and = searchCriteria.$and.filter(
      (criteria) => Object.keys(criteria).length > 0
    );
    const courses = await Course.find(searchCriteria)
      .sort(sortCriteria)
      .skip(skip)
      .limit(pageSize);
    const totalCount = await Course.countDocuments(searchCriteria);
    const coursesToSend = courses.map((course) => {
      return { id: course._id, data: course.data.details };
    });

    res.status(200).json({
      page: pageNumber,
      limit: pageSize,
      totalResults: totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      results: coursesToSend,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching courses", msg: error.message });
  }
};

exports.getSavedCourse = async (req, res) => {
  try {
    const userID = req.id;
    const fetchUser = await User.findOne({ _id: userID });
    const savedCourses = fetchUser.savedCourses;
    const courses = await Course.find({ _id: { $in: savedCourses } });
    const coursesToSend = courses.map((course) => {
      return {
        _id: course._id,
        data: course.data.details,
      };
    });
    res.status(200).json(coursesToSend);
  } catch (error) {}
};

// TO add a new course in save
exports.addSaved = async (req, res) => {
  try {
    const userId = req.id;
    const courseId = req.body.courseId;
    const user = await User.updateOne(
      { _id: userId },
      { $push: { savedCourses: courseId } }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log("error id", error);
  }
};

// To delete added course
exports.deleteSaved = async (req, res) => {
  try {
    const userId = req.id;
    const courseId = req.body.courseId;
    const user = await User.updateOne(
      { _id: userId },
      { $pull: { savedCourses: courseId } }
    );
    res.status(200).json(user);
  } catch (error) {
    console.log("error id", error);
  }
};
