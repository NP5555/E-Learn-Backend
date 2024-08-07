const User = require("../models/user")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const { SECRET_TOKEN } = require("../config/crypto");



// Controller for user registeration
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hasdedPAss = await bcrypt.hash(password, 10)
        user = await User.create({ username, email, password: hasdedPAss })
        res.status(201).json({ msg: " user cretaed successfully!" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.login = async (req, res) => {
    try {
        const user = await AuthUser.findOne({ email: req.body.email });
        if (!user) return res.status(401).send("Invalid email");

        if (req.body.password !== user.password) return res.status(401).send("Email or Password is wrong");

        let payload = { id: user._id};
        const token = jwt.sign(payload, SECRET_TOKEN);
        console.log("token is generated", token)

        res.cookie('token', token, {
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

