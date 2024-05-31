require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const indexRouter = require("./routes/expenseRoutes")
const { default: mongoose } = require("mongoose")
app.use(indexRouter)
async function dbConnect() {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("Connected to MongoDB database/ cluster")
    } catch (e) {
        console.error("Error in connecting to the database", e)
    }
}
dbConnect()
app.listen(PORT, () => {
    console.log("Expense Tracker API running on port", PORT)
})