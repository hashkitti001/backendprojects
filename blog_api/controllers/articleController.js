const Article = require("../models/articles")

let getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find({})
        if (articles) {
            return res.status(200).json({ "articles": articles })
        }
        else {
            throw new Error("No articles found")
        }
    } catch (e) {
        console.error("Couldn't get articles because", e.msg)
        res.status(500).json({error: "Couldn't get articles"})
    }

}

module.exports = {
    getAllArticles
}