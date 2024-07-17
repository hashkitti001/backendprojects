import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
import { UserRequest } from "../interfaces/UserDto";
import prisma from "../db/prismaClient";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import process from "node:process";

const generateAccessToken = (user: UserRequest) => {
    const jwtSecret: string | undefined = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET environment variable is not defined");
    }

    const token = jwt.sign({ id: user.userId, email: user.email }, jwtSecret, { expiresIn: '1h' });
    return token
}

const createUser = async (req: Request<any, any, UserRequest>, res: Response) => {
    const { username, password, email, phoneNumber, firstName, lastName } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Missing email in request" });
    }
    if (!password) {
        return res.status(400).json({ message: "Password field is empty" });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                phoneNumber,
                firstName,
                lastName
            }
        });

        console.log(newUser);
        return res.status(201).json({
            status: "201",
            message: "User created successfully",
            newUser
        });
    } catch (e: any) {
        if (e.code == "P2002") {
            return res.status(406).json({ "message": "User with this email or username exists in our system" })
        }
        console.error("Something went wrong in creating user", e);
        return res.status(500).json({ message: "Something went wrong in creating user" });
    }
};

const loginUser = async (req: Request<any, any, UserRequest>, res: Response) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Missing email in request" });
    }
    if (!password) {
        return res.status(400).json({ message: "Password field is empty" });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token:string = generateAccessToken(user)

        return res.status(200).json({
            status: "200",
            message: "Login successful",
            token
        });
    } catch (e) {
        console.error("Something went wrong in logging in user", e);
        return res.status(500).json({ message: "Something went wrong in logging in user" });
    }
};

export { createUser, loginUser };
