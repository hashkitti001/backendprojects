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
    try {
        let { date } = req.query;
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) {
            return res.status(400).json({ error: "Invalid format for date. Use yyyy-mm-dd" });
        }
        const articles = await Article.find({
            "publishedAt": date
        })
        if (!articles || articles.length == 0) {
            res.status(404).json({ message: "No articles found in that date range" })

        }
        return res.status(200).json({articles})
    } catch (error) {
        // If an error occurs during the process, return a 500 response with the error message
        res.status(500).json({ error: error.message });
    }
};

let createArticle = async (req, res) => {
    let { title, body, description, author } = req.body
    console.log(author)
    if (!title || !body || !author || !description) {
        return res.status(400).json({ error: "Please provide all required fields" })
    }

    let newArticle = new Article({
        title, body, author, description
    })
    await newArticle.save()
        .then(article => {
            res.status(201).json({ article })
        })
}

let updateArticle = async (req, res) => {
    let id = req.params.id
    let { title, content, author, publishDate } = req.body
    if (!title || !content || !author || !publishDate) {
        return res.status(400).json({ error: "Please provide all required fields" })
    }
    if (!validator.isDate(publishDate)) {
        return res.status(400).json({ error: "Please provide a valid date" })
    }
    const article = await Article.findByIdAndUpdate(id, { title, content, author, publishDate }, { new: true })
    if (!article) {
        res.status(404).json({ error: "No article found" })
    }
    else {
        res.status(200).json({ article })
    }
}
let deleteArticle = async (req, res) => {
    let { id } = req.params
    const article = await Article.findByIdAndDelete(id)
    if (!article) {
        res.status(404).json({ error: "No article found" })
    }
    else {
        res.status(200).json({ article })
    }

}
module.exports = {
    getAllArticles,
    getArticleById,
    getArticleByDate,
    createArticle,
    updateArticle,
    deleteArticle

}