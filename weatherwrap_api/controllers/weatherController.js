require("dotenv").config()
const getWeather = async(req, res) => {
    try {
        const city = req.params.city
        const weatherData  = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Lagos?unitGroup=us&include=days&key=${process.env.API_KEY}&contentType=json`,{
                method: "GET"
            }
        
        )
      const results = await weatherData.json()
     res.status(200).json({results})
    } catch(e){
        console.error(e.message)
    }
}
module.exports = {
    getWeather
}