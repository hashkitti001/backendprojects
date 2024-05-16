const {Sequelize, DataTypes} = require("sequelize")
const { db } = require("../utils/dbConnect")

const User  = db.define(
    'User',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        
    },
    username: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    }
})
module.exports = User