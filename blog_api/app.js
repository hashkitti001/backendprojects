const cookieParser = require("cookie-parser")
const logger = require("morgan")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const dbConnect = require("./utils/dbConnect")
const indexRouter = require("./routes")
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(indexRouter)
logger("dev")
/* Initiate db connection */
dbConnect()
.then(() => {
    console.info("Connected to MongoDB database successfully!");
})
.catch((e) => {
    console.error("Couldn't connect to database because", e.message);
})
app.listen(PORT, () => {
    console.log("Blog API online")
})