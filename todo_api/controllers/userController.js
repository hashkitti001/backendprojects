/* User controller functions */
require("dotenv").config()
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const salt = await bcrypt.genSalt(5)
        const hashedPassword = await bcrypt.hash(password, salt)

        const [user, created] = await User.findOrCreate({
            where: { username },
            defaults: {
                username,
                password: hashedPassword
            }

        })
        if (created) {
            return res.status(201).json({ message: "Created new user" })

        } else {
            return res.status(409).json({ message: "User already exists" })
        }

    } catch (e) {
        console.error("Couldn't create user because", e.message)
        return res.status(500).json({ message: "Internal server error" })/* User controller functions */
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({
            where: { username }
        })
        if (!user) {
            return res.status(404).json({ message: "User doesn't exist. Please sign up to use this service" })
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(409).json({ message: "Invalid password" })
        }
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_KEY, {
            expiresIn: '1h'
        })

        res.cookie("token", token, { httpOnly: true })
        return res.status(200).json({ message: "Logged in" })
    } catch (e) {
        console.error("Couldn't log in user because", e.message)
        res.status(500).json({ message: "Internal server error"})
    }
}

const logoutUser = (req, res) => {
    res.clearCookie('token')
    res.status(200).json({message: "Logged out"})
}

module.exports = {
    createUser,
    loginUser,
    logoutUser
}