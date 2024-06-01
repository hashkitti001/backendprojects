const express = require("express")
const expenseRouter = require("express").Router()
const expenseController = require("../controllers/expenseController")
/* Create an expense */
expenseRouter.post("/expenses", expenseController.createExpense)
/*Get all expenses */
expenseRouter.get("/expenses/all", expenseController.getAllExpenses)
// Filtered GET endpoints
// Get by:
// - Last week
expenseRouter.get("/expenses/lastweek", expenseController.getLastWeeksExpenses)
// - Date range
expenseRouter.get("/expenses/getbydate", expenseController.getExpensesByDate)
// - Category
expenseRouter.get("/expenses/category/:category", expenseController.getExpenseByCategory)

/* Update expense */ 
expenseRouter.patch("/expenses/update/:id", expenseController.updateExpense)
/* Delete expense */
expenseRouter.delete("/expense/deleteExpense/:id", expenseController.deleteExpense)


module.exports = expenseRouter
