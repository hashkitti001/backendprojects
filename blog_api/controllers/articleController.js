const Article = require("../models/articles")
const validator = require("validator")
let getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find({})
        if (!articles) {
            throw new Error("No articles found")

        }
        else {
            return res.status(200).json({ articles })
        }
    } catch (e) {
        console.error("Couldn't get articles because", e.message)
        res.status(500).json({ error: "Couldn't get articles" })
    }

}
let getArticleById = async (req, res) => {
    try {
        let { id } = req.params
        const article = await Article.findById(id)
        if (!article) {
            throw new Error("No articles found")
        }
        else {

            return res.status(200).json({ "article": article })
        }
    } catch (e) {
        console.error("Couldn't get article by that id", e.message)
        res.status(500).json({ error: "Couldn't get article by that id" })
    }

}

let getArticleByDate = async (req, res) => {
    let { date } = req.query
    const articles = await Article.find({ "publishDate": date })
    if (!articles) {
        res.status(404).json({ error: "No articles found" })
    }
    else {
        res.status(200).json({ articles })
    }
}

let createArticle = async (req, res) => {
    let { title, content, author, publishDate } = req.body
    if (!title || !content || !author || !publishDate) {
        return res.status(400).json({ error: "Please provide all required fields" })
    }
    if (!validator.isDate(publishDate)) {
        return res.status(400).json({ error: "Please provide a valid date" })
    }
    let newArticle = new Article({
        title, content, author, publishDate
    })
    await newArticle.save()
        .then(article => {
            res.status(201).json({ article })
        })
}
module.exports = {
    getAllArticles,
    getArticleById,
    getArticleByDate,
    createArticle

}