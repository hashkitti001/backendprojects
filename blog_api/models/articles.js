const mongoose = require("mongoose")
const queriableDate = () => {
    let dt = new Date()
    return dt
         .toJSON()
         .substring(0, 10)

}
const articleSchema = mongoose.Schema({
    "title": { type: String, unique: true, required: true },
    "description": { type: String, unique: true },
    "body": { type: String, required: true },
    "author": { type: String, required: true },
    "publishedAt": { type: String, default: queriableDate() },
    "createdAt": {type: Date, default: Date.now()}
})

const Article = mongoose.model("articles", articleSchema)
module.exports = Article