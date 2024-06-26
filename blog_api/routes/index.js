/* 
* Middleware pattern defining route endpoints for the API

*/
const express = require("express")
const indexRouter = express.Router()
const articleController = require("../controllers/articleController")

/*All articles - articleController.getAllArticles */
indexRouter.get("/articles", articleController.getAllArticles)
/* Get article by id - articleController.getArticleById*/
indexRouter.get("/articles/:id",articleController.getArticleById)

/* Get article by publishing date */
indexRouter.get("/articlesbyDate", articleController.getArticleByDate)

/* Create an article */
indexRouter.post("/article", articleController.createArticle)

/* Update an existing article by it's ID */
indexRouter.patch("/article/:id", articleController.updateArticle)

/* Delete an article */
indexRouter.delete("/article/:id",articleController.deleteArticle)

module.exports = indexRouter