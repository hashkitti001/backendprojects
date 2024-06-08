// src/models/note.js
const { DataTypes } = require('sequelize');
const { db } = require('../utils/dbConnect');
const Note = db.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: true,
});
db.sync()
module.exports = Note;
