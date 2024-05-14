const Article = require("../models/articles")

let getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find({})
        if (articles) {
            return res.status(200).json({ articles })
        }
        else {
            throw new Error("No articles found")
        }
    } catch (e) {
        console.error("Couldn't get articles because", e.message)
        res.status(500).json({error: "Couldn't get articles"})
    }

}
let getArticleById = async(req, res) => {
    try {
        let id = req.params.id
        const article = await Article.findById(id)
        if (article) {
            return res.status(200).json({ "article": article })
        }
        else {
            throw new Error("No articles found")
        }
    } catch (e) {
        console.error("Couldn't get article by that id", e.message)
        res.status(500).json({error: "Couldn't get article by that id"})
    }

}

module.exports = {
    getAllArticles, getArticleById,

}