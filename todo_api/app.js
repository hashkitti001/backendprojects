const cookieParser = require("cookie-parser")
const logger = require("morgan")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const { dbConnect } = require("./utils/dbConnect")
const taskRouter = require("./routes/taskRouter")
const userRouter = require("./routes/userRouter")
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(userRouter)
app.use(taskRouter)
logger("dev")
/* Initiate db connection */
dbConnect()

app.listen(PORT, () => {
    console.log("Todo API listening on port 3000")
})