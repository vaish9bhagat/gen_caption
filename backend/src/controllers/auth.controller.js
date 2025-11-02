const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const registercontroller = async (req, res) => {
    const { username, password } = req.body;

    const userexist = await usermodel.findOne({ username });

    if (userexist) {
        return res.status(409).json({
            message: "user with this username already exist in DB"
        })

    }

    const user = await usermodel.create({
        username,
        password: await bcrypt.hash(password, 10)

    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 604800000
    });

    res.status(201).json({
        message: "user registered successfully ",
        token
    })


}
const logincontroller = async (req, res) => {
    const { username, password } = req.body;


    const user = await usermodel.findOne({ username });

    if (!user) {
        return res.status(401).json({
            message: "invalid username try again"
        })
    }
    const ispasswordval = await bcrypt.compare(password, user.password);

    if (!ispasswordval) {
        return res.status(401).json({
            message: "invalid password try again "
        })
    }

    try {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
            maxAge: 604800000
        });

        res.json({
            message: "user logged in successfully",
            user
        })

    } catch (error) {
        res.json({
            message: "invalid token ,failed to login"
        })

    }
}

const logoutcontroller = async (req, res) => {

    res.clearCookie("token", {
        path: '/',

    });
    console.log("logout")


    return res.json({
        message: "user logged out successfully"
    })


}
module.exports = {
    registercontroller,
    logincontroller,
    logoutcontroller
}