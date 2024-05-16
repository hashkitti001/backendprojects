const {DataTypes} = require("sequelize")
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
const syncModel = async () => {
    try {
        await User.sync();
        console.log("User model synchronized successfully");
    } catch (e) {
        console.error("Error synchronizing User model:", error);
       
    }
};
syncModel()
module.exports = User