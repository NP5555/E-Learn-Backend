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


// exports.SignOut = async (req , res) => {
//     try {
//         const cookie = req.cookies.token;
//         console.log(cookie)
//         jwt.verify(cookie, SECRET_TOKEN , async (err , docode) => {
//             if (err) {
//                 res.status(403).json({
//                     message: "Token not found"
//                 })
//             }

//         }
//         )
//         res.clearCookie('token')
//     } catch (error) {
        
//     }
// }

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
            res.clearCookie('token');

            // Send a success response
            return res.status(200).json({ message: "Successfully signed out" });
        });
    } catch (error) {
        console.error("Error during sign out", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



exports.deleteUser = async (req, res) => {
    try {
        const cookie = req.cookies.token
        jwt.verify(cookie, SECRET_TOKEN, async (error, decode) => {
            if (error) {
                res.status(408).json({
                    message: "Cookie not found!"
                })
            }
            const delUser = await User.deleteOne({ _id: decode.id })
            if (delUser.deletedCount === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(204).json({
                message: "User deleted Successfully!"
            })
        })
    } catch (error) {
        console.log(error);
    }
}



