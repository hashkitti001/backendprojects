/* User controller functions */
const User = require("../models/user")
const bcrypt = require("bcryptjs")
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