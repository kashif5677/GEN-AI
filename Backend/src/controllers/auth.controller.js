const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenBlacklistModel = require('../models/blacklist.model')

/**
 * @name registerUserController
 * @description register a new user,expects username,email,password
 * @access public
 */
async function registerUserController(req, res) {
    const { username, email, password } = req.body
    if (!username || !email || !password) return res.status(400).send("all fields are required")

    const isUserAlreadyExists = await userModel.findOne({ $or: [{ email }, { username }] })
    if (isUserAlreadyExists) return res.status(400).send("user already exists")

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id: user._id }, process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)
    res.status(201).json({
        message: "user registered successfully",
        user: {
            username: user.username,
            email: user.email
        }
    })

}
/** 
 * @name loginUserController
 * @description login a user,expects email,password
 * @access public
 */
async function loginUserController(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(400).json({
            message: "password or email is incorrect"
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "password or email is incorrect"
        })
    }

    const token = jwt.sign(
        { id: user._id }, process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
    )

    res.cookie("token", token)
    res.status(201).json({
        message: "user logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token to blacklist
 * @access public
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token

    if (token) {
        await tokenBlacklistModel.create({ token })
    }
    res.clearCookie("token")
    res.status(200).json({
        message: "user logged out successfully"
    })
}

/**
 * @name getCurrentUserController
 * @description get the current logged in user details
 * @access private
 */
async function getCurrentUserController(req, res) {
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        message: "user details",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getCurrentUserController
}