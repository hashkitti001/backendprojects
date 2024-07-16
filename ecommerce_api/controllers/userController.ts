import { users } from "../models/users"
import { UserRequest } from "../interfaces/UserRequest"
import { Request, Response } from "express"
import db from "../db/migrate"
import bcrypt from "bcryptjs"
import validator from "validator"

const createUser = async (req: Request<any, any, UserRequest>, res: Response) => {
    const { username, password, email, phone_number } = req.body
    if(!email){
        return res.status(400).json({"message": "Missing email in request"})
    }
    if(!password){
        return res.status(400).json({"message":"Password field is empty"})
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ "message": "Invalid email format" })
    }
    try {

        const salt = await bcrypt.genSalt(5)
        const hashedPassword = await bcrypt.hash(password, salt)
        const result = await db.insert(users).values({
            username,
            email,
            password: hashedPassword,
            phone_number
        }).returning()
        const newUser = result
        console.log(newUser)
        return res.status(201).json({
            "status": "201",
            "message": "User created successfully",
            newUser
        })

    } catch (e) {
        console.error("Something went wrong in creating user", e)
        res.status(500).json({ "message": e })
    }
}



export { createUser }