const express = require("express")
const userRouter = express.Router()
const userController = require("../controllers/userController")
const dummy = () => {
    return "Dummy"
}

/* Create new user */
userRouter.post("/users/createuser", userController.createUser)

/* Login user*/
userRouter.post("/users/login", dummy)

/* Logout user */
userRouter.post("/users/logout", dummy)


module.exports = userRouter