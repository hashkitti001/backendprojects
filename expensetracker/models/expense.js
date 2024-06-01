const mongoose = require("mongoose")
const { Schema } = mongoose
const expenseSchema = new Schema({
    "description": {
        type: String,
        required: true,
    },
    "amount": {
        type: Number,
        required: true
    },
    "category": {
        type: String,
        enum: ['Groceries', 'Leisure', 'Electronics', 'Utilities', 'Clothing'],
        required: true
    },
    "date": {
        type: Date,
        default: new Date().toString().substring(0, 10),
        required: true
    },
    "userId": {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})
const Expense = mongoose.model("Expenses", expenseSchema)
module.exports = Expense
