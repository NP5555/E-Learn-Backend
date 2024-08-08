const jwt = require('jsonwebtoken');
const { SECRET_TOKEN } = require("../config/crypto")


exports.verifyUserToken = async (req, res, next) => {

    try {
        const cookie = req.cookies.token;
        console.log("the cookie is", cookie)
        if (!cookie) {
            return res.status(401).json({
                msg: "Unauthorized user!"
            });
        }

        console.log(SECRET_TOKEN)
        jwt.verify(cookie, SECRET_TOKEN, (err, decode) => {
            res.send(err);
            if (!decode) {
                return res.status(401).json({
                    msg: "user not verified"
                });
            }
            req.id = decode.id;
            next();
        });

    } catch (error) {
        console.log(error)
        res.status(400).send("Invalid Token");
    }
}




// const { SECRET_TOKEN } = require("../config/crypto");
// const jwt = require("jsonwebtoken");

// exports.verifyToken = async (req, res, next) => {
//   try {
//     const cookie = req.cookies.token;
//     if (!cookie) return res.status(404).json({ message: "No Token Found" });
//     jwt.verify(cookie, SECRET_TOKEN, async (error, decode) => {
//       if (error) return res.status(404).json({ message: "Invalid Token" });
//       req.id = decode.id;
//       next();
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
