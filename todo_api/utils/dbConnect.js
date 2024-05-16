require("dotenv").config()
const { Sequelize } = require('sequelize');
async function dbConnect() {
    const db = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    })
    try {
        await db.authenticate()
        console.log("Connected to MySQL database successfully")
    } catch (e) {
        console.error("Unable to connect to the network", e.message)
    }
}
module.exports = dbConnect