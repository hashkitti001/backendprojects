require('dotenv').config();
const Redis = require('redis');
// Initialize Redis client
const redis = Redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

// Handle connection events
redis.on('error', (err) => {
    console.error('Redis error:', err);
});

// Ensure the client is connected before proceeding
(async () => {
    try {
        await redis.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Error connecting to Redis:', err);
    }
})();

const getWeather = async (req, res, next) => {
    try {
        const city = req.params.city;
        const cachedData = await redis.get("city");
        if (cachedData) {
            console.log('Cache hit', cachedData);
            return res.status(200).json(JSON.parse(cachedData));
        }

        console.log('Cache miss');
        const weatherResponse = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&include=days&key=${process.env.API_KEY}&contentType=json`,
            { method: 'GET' }
        );

        if (!weatherResponse.ok) {
            throw new Error(`Failed to fetch weather data: ${weatherResponse.statusText}`);
        }

        const weatherData = await weatherResponse.json();
        console.log(weatherData)
        await redis.set("city", JSON.stringify(weatherData));
        
        return res.status(200).json(weatherData);
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({ error: e.message });
    }
};

module.exports = {
    getWeather
};
