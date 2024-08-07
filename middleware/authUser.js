const jwt = require("jsonwebtoken")
const { SECRET_TOKEN } = require("../config/crypto")


exports.verifyUserToken = (req, res , next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).redirect('/login');
        }

        const verifiedUSer = jwt.verify(token, SECRET_TOKEN)
        if (!verifiedUSer) {
            return res.status(401).redirect('/login');
        }
        req.user = verifiedUSer;
        next();
    } catch (error) {
        console.log(error)
        res.status(400).send("Invalid Token");
    }
}


