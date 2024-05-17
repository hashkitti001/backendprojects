const { Sequelize, DataTypes } = require("sequelize");
const User = require("../models/user")
const { db } = require("../utils/dbConnect")

const Task = db.define(
    'Task',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM("undone", "pending", "done"),
            allowNull: false,
            defaultValue: "undone"
        },
        priority: { 
            type: DataTypes.ENUM("low", "medium", "high"),
            defaultValue: "low", // Corrected from default to defaultValue
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:User,
                key:'id'
            }
        }
    }
);
/* Foreign key relationship between task and user */
Task.belongsTo(User, {foreignKey: 'createdBy', targetKey: 'id'})
const syncModel = async () => {
    try {
        await Task.sync()
        console.log("Task model synchronized successfully");
    } catch (e) {
        console.error("Error synchronizing User model:", e.message);
        
    }
};
syncModel()
module.exports = Task;
