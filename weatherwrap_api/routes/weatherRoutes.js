const express = require("express")
const weatherController = require("../controllers/weatherController")
const weatherRouter = express.Router()
const dummy = () => {
    return "Dummy"
}
weatherRouter.get('/city/:city', weatherController.getWeather)

module.exports = weatherRouter