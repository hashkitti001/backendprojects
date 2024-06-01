const express = require("express")
const expenseRouter = require("express").Router()
const authMiddleware = require("../utils/authMiddleware")
const expenseController = require("../controllers/expenseController")
/* Create an expense */
expenseRouter.post("/expenses", authMiddleware, expenseController.createExpense)
/*Get all expenses */
expenseRouter.get("/expenses/all", authMiddleware, expenseController.getAllExpenses)
// Filtered GET endpoints
// Get by:
// - Last week
expenseRouter.get("/expenses/lastweek", authMiddleware, expenseController.getLastWeeksExpenses)
// - Date range
expenseRouter.get("/expenses/getbydate", authMiddleware, expenseController.getExpensesByDate)
// - Category
expenseRouter.get("/expenses/category/:category", authMiddleware, expenseController.getExpenseByCategory)

/* Update expense */ 
expenseRouter.patch("/expenses/update/:id", authMiddleware, expenseController.updateExpense)
/* Delete expense */
expenseRouter.delete("/expense/deleteExpense/:id", authMiddleware, expenseController.deleteExpense)


module.exports = expenseRouter
