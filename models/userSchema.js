const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  user_type_id: {
    type: Number,
    default: 0,
  },
  savedCourses: [
    { _id: { type: mongoose.Schema.Types.ObjectId, ref: "Course" } },
  ],
  boughtCourses: [
    { _id: { type: mongoose.Schema.Types.ObjectId, ref: "Course" } },
  ],
  noOfSavedCourses: { type: Number },
  noOfBoughtCourses: { type: Number },

  otp: { otp: { type: Number }, expireDate: { type: Number } },
});

userSchema.pre("save", function (next) {
  const savedCourses = this.savedCourses.length;
  const boughtCourses = this.boughtCourses.length;

  this.noOfSavedCourses = savedCourses;
  this.boughtCourses = boughtCourses;

  next();
});

module.exports = mongoose.model("AuthUSer", userSchema);
