const express = require("express")
const userRouter = express.Router()
const userController = require("../controllers/userController")

/* Create new user */
userRouter.post("/users/register", userController.createUser)

/* Login user*/
userRouter.post("/users/login", userController.loginUser)

/* Logout user */
userRouter.post("/users/logout", userController.logoutUser)


module.exports = userRouter