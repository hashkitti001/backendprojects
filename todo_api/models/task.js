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
        dueDate: {
            type: DataTypes.DATE,
            allowNull: true
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
        }
    }
);
/* Foreign key relationship between task and user */
Task.belongsTo(User)

module.exports = Task;
