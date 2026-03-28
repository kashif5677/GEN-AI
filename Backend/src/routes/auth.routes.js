const express = require("express")
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middleware/auth.middleware")

const authRouter = express.Router()


/**
 * @route POST api/auth/register
 * @description register a user
 * @access public
 */
authRouter.post("/register", authController.registerUserController)

/**
 * @route POST api/auth/login
 * @description login a user
 * @access public
 */
authRouter.post("/login", authController.loginUserController)
/**
 * @route get api/auth/logout
 * @description logout a user
 * @access public
 */
authRouter.get("/logout", authController.logoutUserController)

/**
 * @route get api/auth/get-me
 * @description get current user
 * @access private
 */
authRouter.get("/get-me", authMiddleware.authUser, authController.getCurrentUserController)


module.exports = authRouter