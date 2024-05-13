const mongoose = require("mongoose")
const articleSchema = mongoose.Schema({
    "title": { type: String, unique: true, nullable: false },
    "description": { type: String, unique: true },
    "body": { type: String, required: true },
    "author": {type: String, required: true},
    "publishedAt": {type: Date, default: Date.now}
})

const Article = mongoose.model("article", articleSchema)
module.exports = Article