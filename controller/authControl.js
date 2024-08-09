const User = require("../models/userScheme");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const utils = require("../utils/utils");
const nodemailer = require("nodemailer");
const { SECRET_TOKEN } = require("../config/crypto");

// Controller for user registeration
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hasdedPAss = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hasdedPAss });
    res.status(201).json({ msg: " user cretaed successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for user Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("Invalid email");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Password is wrong");

    let payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_TOKEN);
    res.cookie("token", token, {
      httpOnly: true,
      // maxAge: 60 * 60 * 1000
    });
    res.status(200).send({
      message: "User successfully logged in",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error logging in");
  }
};

// To frequestOpt
exports.requestOtp = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).json({ message: "User Not Found" });

  const otp = utils.generateRandomFourDigitNumber();
  const otpExpires = Date.now() + 180 * 1000;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });
  async function sendOtpEmail(email, otp) {
    const mailOptions = {
      from: process.env.email,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for resetting the password is ${otp}`,
      html: `<b>Your OTP for resetting the password is <strong>${otp}</strong></b>`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({ message: error.message });
    }
  }

  user.otp.otp = otp;
  user.otp.expireDate = otpExpires;
  await user.save();
  await sendOtpEmail(email, otp);
  res.status(200).json({ message: "OTP sent to your email" });
};

// request change otp
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res
      .status(400)
      .json({ error: "Email, OTP, and new password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.otp.otp !== otp || user.expireDate < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }
    const hasdNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hasdNewPassword;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error resetting password" });
  }
};

// Controller for user signout
exports.SignOut = async (req, res) => {
  try {
    const cookie = req.cookies.token;
    if (!cookie) {
      return res.status(401).json({ message: "No token provided" });
    }
    jwt.verify(cookie, SECRET_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      // Clear the token cookie
      res.clearCookie("token");
      return res.status(200).json({ message: "User Sign out successfully" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to delete user account
exports.deleteUser = async (req, res) => {
  try {
    const cookie = req.cookies.token;
    jwt.verify(cookie, SECRET_TOKEN, async (error, decode) => {
      if (error) {
        res.status(408).json({
          message: "Cookie not found!",
        });
      }
      const delUser = await User.deleteOne({ _id: decode.id });
      if (delUser.deletedCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(204).json({
        message: "User deleted Successfully!",
      });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.test = async (req, res) => {
  // res.send("hello")
};
