const User = require("../models/user")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { SECRET_TOKEN } = require("../config/crypto");



// Controller for user registeration
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hasdedPAss = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hasdedPAss })
        res.status(201).json({ msg: " user cretaed successfully!" })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });
        if (!user) return res.status(401).send("Invalid email");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send("Password is wrong");

        let payload = { id: user._id };
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

