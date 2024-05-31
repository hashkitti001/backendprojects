const express = require("express")
const indexRouter = require("express").Router()
const expenseController = require("../controllers/expenseController")
indexRouter.get("/expenses/lastweek", expenseController.getLastWeeksExpenses)
module.exports = indexRouter
