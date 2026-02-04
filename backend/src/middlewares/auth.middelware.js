const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authmiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    console.log(token)

    if (!token) {

        return res.status(401).json({
            message: "token not found login first"
        })

    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await usermodel.findById(decoded.id);
        console.log(user)
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        req.user = user;
        next()


    } catch (error) {
        return res.json({
            message: " login first"
        })

    }

}
module.exports = authmiddleware;