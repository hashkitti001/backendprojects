// src/config/database.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const db = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
    logging: false,
  }
);

async function dbConnect() {
  try {
    await db.authenticate();
    console.log('Connected to MySQL database successfully');
    await db.sync();
  } catch (e) {
    console.error('Unable to connect to the database:', e.message);
  }
}

module.exports = { dbConnect, db };
