const Admin = require("../models/adminSchema")
const Catagory = require("../models/catagoriesSchema");
const Course = require("../models/courseSchema");
const Mentor = require("../models/mentorSchema")
const User = require("../models/userSchema");
const Video = require("../models/videoSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_TOKEN } = require("../config/crypto");


exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email: email })
        if (!admin) return res.status(404).json({ message: "Admin not found!" })
        const IsMatch = await bcrypt.compare(password, admin.password)
        if (!IsMatch) return res.status(401).json({ message: "Wrong password!" })
        let payload = { id: admin._id };
        const token = jwt.sign(payload, SECRET_TOKEN);
        res.cookie("token", token, {
            httpOnly: true,
            // maxAge: 60 * 60 * 1000
        });
        res.status(200).send({
            message: "Admin successfully logged in",
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


exports.user = async (req, res) => {
    try {
        const adminId = req.id;
        res.send(adminId)
    } catch (error) {
        
    }
}



