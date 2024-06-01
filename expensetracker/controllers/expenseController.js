const Expense = require("../models/expense")
const createExpense = async (req, res) => {
    try {
        const { description, amount, category } = req.body
        if (!description || !amount || !category) {
            return res.status(409).json({ error: "Please fill all required fields" })
        }
        if (description && amount  && category) {
            const newExpense = new Expense({
                description,
                amount,
                category,
                userId: req.user.id
            })
            await newExpense.save()

            return res.status(201).json({ message: "Expense created" })
        }

    } catch (e) {
        return res.status(500).json({ error: `Something went wrong when adding the expense, ${e.message}` })
    }
}
const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id })
        if (!expenses.length) {
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

        //Get current date 
        let oneWeekAgo = new Date();
        //Get timestamp for last week
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
        const lastWeeksExpenses = await Expense.find({
            userId: req.user.id,
            date: { $gte: oneWeekAgo }
        })

        return res.status(200).json({
            "message": "Last week's expenses",
            lastWeeksExpenses
        })

    } catch (e) {
        return res.status(500).json({ error: `Something went wrong when getting last weeks expenses, ${e.message}` })
    }
}
const getExpensesByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.query
        console.info(startDate, endDate)
        if (!startDate || !endDate) {
            return res.status(400).json({ error: "Please provide start date and end date in your query" })
        }
        const expenses = await Expense.find({
            userId: req.user.id,
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        })
        return res.status(200).json({ expenses })
    } catch (e) {
        console.error(e.message)
        return res.status(500).json({ error: "Something went wrong when getting dates in that range" })
    }
}
const getExpenseByCategory = async (req, res) => {
    try {
        const { category } = req.params
        if (!category) {
            return res.status(400).json({ error: "Please provide a valid category in your request" })

        }
        const expenses = await Expense.find({
            userId: req.user.id,
            category
        })
        return res.status(200).json({ expenses })
    } catch (e) {
        console.error(e.message)
        return res.status(500).json({ error: "Something went wrong when getting expenses by category" })
    }
}
const updateExpense = async (req, res) => {
    try {
        const { id } = req.params
        const updates = req.body

        const expense = await Expense.findOneAndUpdate(
            { id: id, userId: req.user.id },
            updates,
            { new: true }
        )
    } catch (e) {
        console.error(e.message)
        return res.status(500).json({ error: "Something went wrong in updating that expense" })
    }
}
const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params
        const deletedExpense = await Expense.findByIdAndDelete({ id: req.user.id })
        if (!deletedExpense) {
            return res.status(404).json({ message: "Couldn't delete expense as it was not found" })
        }
        return res.status(200).json({ message: "Expense deleted" })
    } catch(e){
        console.error(e.message)
        return res.status(500).json("Error occured while deleting  delete expense")
    }
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