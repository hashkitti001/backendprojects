// src/models/note.js
const { DataTypes } = require('sequelize');
const { db } = require('../config/database');

const Note = db.define('Note', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = Note;
