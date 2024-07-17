import express from "express"
import { createUser, loginUser } from "../controllers/userController"
const publicRouter = express.Router()

publicRouter.post("/api/v1/register", createUser)
publicRouter.post("/api/v1/login", loginUser)
export default publicRouter
