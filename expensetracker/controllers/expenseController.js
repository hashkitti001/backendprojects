const Expense = require("../models/expense")

const createExpense = async (req, res) => {
    try {
        const { description, amount, price, category } = req.body
        if (!description || !amount || !price || !category) {
            return res.status(409).json({ error: "Please fill all required fields" })
        }
        if (description && amount && price && category) {
            const newExpense = new Expense({
                description,
                amount,
                price,
                category
            })
            await newExpense.save()

            return res.status(200).json({ message: "Expense created" })
        }

    } catch (e) {
        return res.status(500).json({ error: `Something went wrong when adding the expense, ${e.message}` })
    }
}
const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({})
        if (!expenses) {
            return res.status(404).json({ message: "Couldn't load all expenses" })
        }
        return res.status(200).json({ expenses })
    }
    catch (e) {
        return res.status(200).json({ error: "Something went wrong when getting all expenses" })
    }
}
const getLastWeeksExpenses = async (req, res) => {
    try {
        const allExpenses = await Expense.find({})
        //Get current date 
        let currentDate = new Date();
        //Get timestamp for last week
        let lastWeekDate = new Date(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate() - 7}`).toString().substring(0, 10)
        let lastWeeksExpenses = allExpenses.filter(expense => expense.date == lastWeekDate)
        return res.status(200).json({
            "message": "Last week's expenses",
            "expenses": lastWeeksExpenses
        })

    } catch (e) {
        return res.status(500).json({ error: `Something went wrong when getting last weeks expenses, ${e.message}`})
    }
}
const getExpensesByDate = async (req, res) => {
    try {
    const allExpenses = await Expenses.find({})

    } catch (e) {

    }
}
const getExpenseByCategory = async (req, res) => {

}
const updateExpense = async (req, res) => {

}
const deleteExpense = async (req, res) => {

}
module.exports = {
    createExpense,
    getAllExpenses,
    getExpenseByCategory,
    getLastWeeksExpenses,
    getExpensesByDate,
    updateExpense,
    deleteExpense
}