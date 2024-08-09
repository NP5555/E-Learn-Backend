const mongoose = require("mongoose");
const Course = require("../models/courseSchema"); // Adjust the path as necessary
const Mentor = require("../models/mentorSchema"); // Adjust the path as necessary

mongoose.connect("mongodb://localhost:27017/E-learning", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createCourses = async () => {
  const mentorIds = await Mentor.find({});

  const courses = [{
      students: [
        { _id: "64d8f7d2f1a1a0f01b8e9c1a" },
        { _id: "64d8f7d2f1a1a0f01b8e9c1b" },
      ],
      data: {
        details: {
          category: "Web Development",
          title: "Full Stack Web Development",
          price: 199.99,
          rating: 4.8,
          numOfReviews: 1500,
          img: "https://example.com/fullstack.jpg",
        },
        duration: 40, // in hours
        description: "Learn full stack web development with hands-on projects and real-world examples.",
        reviews: [
          {
            rating: 5,
            review: "Excellent course with in-depth coverage of topics!",
            _id: "64d8f7d2f1a1a0f01b8e9c1c",
          },
          {
            rating: 4,
            review: "Good content but could use more advanced projects.",
            _id: "64d8f7d2f1a1a0f01b8e9c1d",
          },
        ],
        lessons: [
          {
            title: "Introduction to Web Development",
            desc: "Overview of web technologies and tools.",
            img: "https://example.com/lesson1.jpg",
          },
          {
            title: "Frontend Development",
            desc: "Learning HTML, CSS, and JavaScript.",
            img: "https://example.com/lesson2.jpg",
          },
          {
            title: "Backend Development",
            desc: "Building APIs with Node.js and Express.",
            img: "https://example.com/lesson3.jpg",
          },
        ],
      },
    }
  ]

  try {
    await Course.deleteMany({});
    await Course.insertMany(courses);
    // await Course.create(newCourse);
    console.log("Database seeded with courses");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

createCourses();
