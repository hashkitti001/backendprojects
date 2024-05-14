/* 
* Middleware pattern defining route endpoints for the API

*/
const express = require("express")
const indexRouter = express.Router()

function dummy () {
    return 1
}
/*All articles - articleController.getAllArticles */
indexRouter.get("/articles", articleController.getAllArticles)
/* Get article by id - articleController.getArticleById*/
indexRouter.get("/articles/:id", dummy)

/* Get article by publishing date */
indexRouter.get("/articlesbyDate", dummy)

/* Create an article */
indexRouter.post("/article", dummy)

/* Update an existing article by it's ID */
indexRouter.patch("/article/:id", dummy)

/* Delete an article */
indexRouter.delete("/article/:id", dummy)

module.exports = indexRouter