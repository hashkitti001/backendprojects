const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const dbConnect = require("./utils/dbConnect")
dbConnect()
app.listen(PORT, () => {
    console.log("Todo API listening on port", PORT)
})