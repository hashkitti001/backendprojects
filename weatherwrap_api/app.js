const cookieParser = require("cookie-parser")
const logger = require("morgan")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

logger("dev")


app.listen(PORT, () => {
    console.log("Weather Wrapper API listening on port 3000")
})