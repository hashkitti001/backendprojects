import express from "express"
import publicRouter from "./routes/publicRoutes"
import privateRouter from "./routes/privateRoutes"

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.urlencoded({ extended: true }))
app.use(publicRouter)
app.use(privateRouter)
app.use(express.json())

app.listen(PORT, () => {
    console.log("Ecommerce API running on port", PORT)
})