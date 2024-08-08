const jwt = require('jsonwebtoken');
const { SECRET_TOKEN } = require("../config/crypto")


exports.verifyUserToken = async (req, res, next) => {

    try {
        const cookie = req.cookies.token;
        if (!cookie) {
            return res.status(401).json({
                msg: "Unauthorized user!"
            });
        }

        console.log(SECRET_TOKEN)
        jwt.verify(cookie, SECRET_TOKEN, (err, decode) => {
            if (err) {
              return  res.status(403).json({
                Message: err
              })
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
